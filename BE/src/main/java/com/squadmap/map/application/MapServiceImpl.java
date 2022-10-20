package com.squadmap.map.application;

import com.squadmap.category.application.dto.CategoryInfo;
import com.squadmap.category.domain.Category;
import com.squadmap.category.infrastructure.CategoryRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.map.application.dto.CategorizedPlaces;
import com.squadmap.map.application.dto.MapDetail;
import com.squadmap.map.application.dto.MapSimpleInfo;
import com.squadmap.map.application.dto.MapsResponse;
import com.squadmap.map.domain.Map;
import com.squadmap.map.infrastructure.MapRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import com.squadmap.place.application.dto.PlaceSimpleInfo;
import com.squadmap.place.domain.Place;
import com.squadmap.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MapServiceImpl implements MapService{

    private final MapRepository mapRepository;
    private final MemberRepository memberRepository;
    private final PlaceRepository placeRepository;

    @Override
    @Transactional
    public Long create(String mapName, Boolean fullDisclosure, Long memberId) {
        Map save = mapRepository.save(Map.of(mapName, fullDisclosure, memberId));

        return save.getId();
    }

    @Override
    @Transactional
    public void update(Long memberId, Long mapId, String mapName, boolean fullDisclosure) {
        // 권한 검증 로직이 필요
        Map targetMap = mapRepository.findById(mapId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        targetMap.update(mapName, fullDisclosure);
    }

    @Override
    public Page<MapSimpleInfo> readPublic(Pageable pageable) {
        Page<Map> maps = mapRepository.findAllByFullDisclosure(true, pageable);
        java.util.Map<Long, Member> members = getMembers(maps);

        return maps.map(map -> {
            Member member = members.get(map.getMemberId());
            return new MapSimpleInfo(map.getId(), map.getName(), member.getId(), member.getNickname(), map.getPlacesCount());
        });
    }

    @Override
    public MapDetail findOne(Long mapId, Long memberId) {
        Map map = mapRepository.findById(mapId).orElseThrow(RuntimeException::new);
        if(!map.isFullDisclosure() && !map.canAccess(memberId)) {
           throw new ClientException(ErrorStatusCodeAndMessage.UNAUTHORIZED);
        }
        Member member = memberRepository.findById(map.getMemberId()).orElseThrow(RuntimeException::new);
        List<Place> places = placeRepository.findAllByMapId(mapId);

        return MapDetail.of(map, member, places.size(), categorize(places));
    }

    @Override
    public MapsResponse readGroupMap(Long memberId) {
        List<Map> maps = mapRepository.findAllByMemberId(memberId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));
        List<MapSimpleInfo> mapSimpleInfos = maps.stream().map(
                        map -> new MapSimpleInfo(
                                map.getId(),
                                map.getName(),
                                member.getId(),
                                member.getNickname(),
                                map.getPlacesCount())
                )
                .collect(Collectors.toUnmodifiableList());

        return new MapsResponse(mapSimpleInfos.size(), mapSimpleInfos);

    }

    private java.util.Map<Long, Member> getMembers(Page<Map> maps) {
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
                .map(e-> new CategorizedPlaces(CategoryInfo.from(e.getKey()),
                        e.getValue().stream()
                        .map(PlaceSimpleInfo::from)
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

}
