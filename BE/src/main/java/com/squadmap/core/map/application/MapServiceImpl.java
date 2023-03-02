package com.squadmap.core.map.application;

import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.access.MemberContext;
import com.squadmap.core.access.RequiredPermission;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.domain.Category;
import com.squadmap.core.category.infrastructure.CategoryRepository;
import com.squadmap.core.comment.infrastructure.CommentRepository;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.domain.GroupMember;
import com.squadmap.core.group.domain.PermissionLevel;
import com.squadmap.core.group.infrastructure.GroupMemberRepository;
import com.squadmap.core.map.application.dto.*;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.map.infrastructure.MapRepository;
import com.squadmap.core.place.application.dto.PlaceSimpleInfo;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.infrastructure.PlaceRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MapServiceImpl implements MapService {

    private final MapRepository mapRepository;
    private final MemberRepository memberRepository;
    private final PlaceRepository placeRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Long create(String mapName, String emoji, Boolean fullDisclosure, Long memberId) {
        Map map = mapRepository.save(Map.of(mapName, emoji, fullDisclosure, memberId));
        groupMemberRepository.save(GroupMember.of(map.getId(), memberId, "HOST"));

        return map.getId();
    }

    @Override
    @Transactional
    public MapUpdateInfo update(Long memberId, Long mapId, String mapName, String emoji, boolean fullDisclosure) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        if (!map.canAccess(memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

        map.update(mapName, emoji, fullDisclosure);

        return new MapUpdateInfo(mapId, mapName, emoji, fullDisclosure);
    }

    //@Cacheable(value = "pagingPublicMaps", key = "{#lastMapId, #name}")
    @Override
    public SimpleSlice<MapSimpleInfo> searchPublic(Long lastMapId, Optional<String> name) {
        Slice<Map> maps = searchPublicWithName(lastMapId, name);

        java.util.Map<Long, Member> members = getMembers(maps.getContent());
        Slice<MapSimpleInfo> simpleInfos = maps.map(map -> {
            Member member = members.get(map.getMemberId());
            return new MapSimpleInfo(map.getId(),
                    map.getName(),
                    map.getEmoji(),
                    member.getId(),
                    member.getNickname(),
                    member.getProfileImage(),
                    placeRepository.countPlacesByMap(map));
        });
        return new SimpleSlice<>(simpleInfos);
    }

    @Override
    @RequiredPermission
    public MapDetail findOne(AccessInfo accessInfo) {
        Map map = mapRepository.findById(accessInfo.getMapId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        Member member = memberRepository.findById(map.getMemberId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        List<Place> places = placeRepository.findAllByMapId(map.getId());
        List<Category> categories = categoryRepository.findAllByMap(map.getId());
        return MapDetail.of(map, member, places.size(), categorize(categories, places), MemberContext.getAuthorityLevel());
    }

    @Override
    public MapsResponse searchGroup(Long memberId, Optional<String> name) {
        List<Long> mapIds = groupMemberRepository.findMapIdByMemberId(memberId);
        List<Map> maps = searchGroupMap(name, mapIds);
        return mapsToMapResponse(maps);
    }

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.HOST)
    public void delete(AccessInfo accessInfo) {
        Long targetMapId = accessInfo.getMapId();

        List<Long> placeIds = placeRepository.findIdsByMapId(targetMapId);

        commentRepository.deleteCommentByPlaceIn(placeIds);
        placeRepository.deleteAllByMapId(targetMapId);
        categoryRepository.deleteCategoriesByMapId(targetMapId);
        groupMemberRepository.deleteAllByMapId(accessInfo.getMapId());
        mapRepository.deleteById(targetMapId);
    }


    private Slice<Map> searchPublicWithName(Long lastMapId, Optional<String> name) {
        PageRequest pageRequest = PageRequest.ofSize(10);
        if (name.isPresent()) {
            return mapRepository.findMapsByFullDisclosureAndIdGreaterThanAndNameStartingWith(pageRequest, true, lastMapId, name.get());
        }
        return mapRepository.findMapsByFullDisclosureAndIdGreaterThan(pageRequest, true, lastMapId);
    }

    private List<Map> searchGroupMap(Optional<String> name, List<Long> mapIds) {
        if (name.isPresent()) {
            return mapRepository.findAllByIdsAndNameContaining(mapIds, name.get());
        }
        return mapRepository.findAllById(mapIds);
    }

    private java.util.Map<Long, Member> getMembers(List<Map> maps) {
        List<Long> memberIds = maps.stream()
                .map(Map::getMemberId)
                .collect(Collectors.toList());

        return memberRepository.findAllById(memberIds)
                .stream()
                .collect(Collectors.toMap(Member::getId, Function.identity()));
    }

    private List<CategorizedPlaces> categorize(List<Category> categories, List<Place> places) {
        java.util.Map<Long, List<Place>> categorizedPlaces = places.stream()
                .collect(Collectors.groupingBy(p -> p.getCategory().getId()));

        return categories.stream().map(category ->  {
            List<PlaceSimpleInfo> placeSimpleInfos = new ArrayList<>();
            if(categorizedPlaces.containsKey(category.getId())) {
                placeSimpleInfos = categorizedPlaces.get(category.getId())
                        .stream()
                        .map(PlaceSimpleInfo::from)
                        .collect(Collectors.toList());
            }
            return new CategorizedPlaces(CategoryInfo.from(category), placeSimpleInfos);
        }
        ).collect(Collectors.toList());
    }

    private MapsResponse mapsToMapResponse(List<Map> maps) {
        if (maps.isEmpty()) {
            return new MapsResponse(0, new ArrayList<>());
        }

        java.util.Map<Long, Member> members = getMembers(maps);
        List<MapSimpleInfo> mapSimpleInfos = maps.stream().map(
                        map -> {
                            Member member = members.get(map.getMemberId());
                            return new MapSimpleInfo(
                                    map.getId(),
                                    map.getName(),
                                    map.getEmoji(),
                                    member.getId(),
                                    member.getNickname(),
                                    member.getProfileImage(),
                                    placeRepository.countPlacesByMap(map));
                        }
                )
                .collect(Collectors.toUnmodifiableList());

        return new MapsResponse(mapSimpleInfos.size(), mapSimpleInfos);
    }


}
