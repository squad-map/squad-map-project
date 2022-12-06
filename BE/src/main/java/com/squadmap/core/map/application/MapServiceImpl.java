package com.squadmap.core.map.application;

import com.squadmap.common.SimplePage;
import com.squadmap.core.category.application.dto.CategoryInfo;
import com.squadmap.core.category.domain.Category;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.map.application.dto.CategorizedPlaces;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.group.domain.GroupMember;
import com.squadmap.core.group.infrastructure.GroupMemberRepository;
import com.squadmap.core.map.application.dto.MapDetail;
import com.squadmap.core.map.application.dto.MapSimpleInfo;
import com.squadmap.core.map.application.dto.MapsResponse;
import com.squadmap.core.map.infrastructure.MapRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import com.squadmap.core.place.application.dto.PlaceSimpleInfo;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    @Transactional
    public Long create(String mapName, String emoji, Boolean fullDisclosure, Long memberId) {
        Map map = mapRepository.save(Map.of(mapName, emoji, fullDisclosure, memberId));
        groupMemberRepository.save(GroupMember.of(map.getId(), memberId, "HOST"));

        return map.getId();
    }

    @Override
    @Transactional
    public void update(Long memberId, Long mapId, String mapName, String emoji, boolean fullDisclosure) {

        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        if (!map.canAccess(memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

        map.update(mapName, emoji, fullDisclosure);
    }

    @Cacheable(value = "pagingPublicMaps", key = "{#pageable.pageNumber, #pageable.pageSize, #name}")
    @Override
    public SimplePage<MapSimpleInfo> searchPublic(Pageable pageable, Optional<String> name) {
        Page<Map> maps = searchPublicWithName(pageable, name);

        java.util.Map<Long, Member> members = getMembers(maps.getContent());
        Page<MapSimpleInfo> simpleInfos = maps.map(map -> {
            Member member = members.get(map.getMemberId());
            return new MapSimpleInfo(map.getId(),
                    map.getName(),
                    map.getEmoji(),
                    member.getId(),
                    member.getNickname(),
                    member.getProfileImage(),
                    placeRepository.countPlacesByMap(map));
        });
        return new SimplePage<>(simpleInfos);
    }

    @Override
    public MapDetail findOne(Long mapId, Long memberId) {
        Map map = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));

        if (!map.isFullDisclosure() && !groupMemberRepository.existsByMapIdAndMemberId(mapId, memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

        Member member = memberRepository.findById(map.getMemberId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        List<Place> places = placeRepository.findAllByMapId(mapId);

        return MapDetail.of(map, member, places.size(), categorize(places));
    }

    @Override
    public MapsResponse searchGroup(Long memberId, Optional<String> name) {
        List<Long> mapIds = groupMemberRepository.findMapIdByMemberId(memberId);
        List<Map> maps = searchGroupMap(name, mapIds);
        return mapsToMapResponse(maps);
    }


    private Page<Map> searchPublicWithName(Pageable pageable, Optional<String> name) {
        if (name.isPresent()) {
            return mapRepository.findAllByFullDisclosureAndNameContaining(pageable, true, name.get());
        }
        return mapRepository.findAllByFullDisclosure(true, pageable);
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

    private List<CategorizedPlaces> categorize(List<Place> places) {
        java.util.Map<Category, List<Place>> categorizedPlaces = places.stream()
                .collect(Collectors.groupingBy(Place::getCategory));

        return categorizedPlaces.entrySet()
                .stream()
                .map(e -> new CategorizedPlaces(CategoryInfo.from(e.getKey()),
                        e.getValue().stream()
                                .map(PlaceSimpleInfo::from)
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
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
