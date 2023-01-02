import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMapDetailInfo } from '@/apis/mypage';
import KakaoMap from '@/components/KaKaoMap';
import Header from '@/components/Map/Header';
import SearchPlace from '@/components/SearchMap/SearchPlace';
import { SUCCESS_GET_DETAIL_MAP } from '@/constants/code';
import { defaultCoords } from '@/constants/map';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import { CategorizedPlaces, PlaceType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

const { kakao } = window;

const SearchMap = () => {
  const { id } = useParams();
  const [placeInfos, setPlaceInfos] = useState<PlaceType[]>([]);

  const { data: mapData } = useQuery(
    ['Map'],
    () => {
      if (id) {
        return getMapDetailInfo(+id);
      }
      return true;
    },
    {
      staleTime: 5 * 60 * 1000, // 5분
    }
  );

  const placesSearchCallBack = (data: ISearchPlace[], status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      const searchPlaceInfos = data.map((place: ISearchPlace) => ({
        place_id: +place.id,
        place_name: place.place_name,
        address: place.address_name,
        latitude: +place.x,
        longitude: +place.y,
        detail_link: place.place_url,
      }));

      setPlaceInfos(searchPlaceInfos);
    }
    if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색 결과가 존재하지 않습니다.
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 검색 결과 중 오류가 발생했습니다.
    }
  };

  const searchAddressToCoordinate = (address: string) => {
    const kakaoSearchService = new kakao.maps.services.Places();
    kakaoSearchService.keywordSearch(address, placesSearchCallBack, {
      location: new kakao.maps.LatLng(defaultCoords.lng, defaultCoords.lat),
    });
  };

  if (mapData && mapData.code !== SUCCESS_GET_DETAIL_MAP)
    return <div>API Error</div>;

  return (
    <section>
      {mapData && (
        <KakaoMap placeInfos={placeInfos}>
          <Header
            headerData={{
              map_id: Number(id),
              emoji: `${unicodeToEmoji(mapData.data.map_emoji)}`,
              title: mapData.data.map_name,
              category_info: mapData.data.categorized_places.map(
                (placeInfo: CategorizedPlaces) => placeInfo.category_info
              ),
            }}
          />
          <SearchPlace
            searchAddressToCoordinate={searchAddressToCoordinate}
            placeInfos={placeInfos}
          />
        </KakaoMap>
      )}
    </section>
  );
};

export default SearchMap;
