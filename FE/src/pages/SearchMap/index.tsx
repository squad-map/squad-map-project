import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './SearchMap.style';
import SearchPlace from './SearchPlace';

import { getMapDetailInfo } from '@/apis/mypage';
import { KakaoMap } from '@/components/KaKaoMap';
import { defaultCoords } from '@/constants/map';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import Header from '@/pages/Map/Header';
import { CategorizedPlaces, PlaceType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const SearchMap = () => {
  const { id } = useParams();
  const [placeInfos, setPlaceInfos] = useState<PlaceType[]>([]);

  const { data: mapData } = useQuery(
    ['Map'],
    () => {
      if (id) {
        return getMapDetailInfo(id);
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
        name: place.place_name,
        address: place.address_name,
        latitude: +place.x,
        longitude: +place.y,
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

  return (
    <S.SearchMap>
      {mapData && (
        <KakaoMap placeInfos={placeInfos}>
          <Header
            headerData={{
              emoji: `${unicodeToEmoji(mapData.map_emoji)}`,
              title: mapData.map_name,
              category_info: mapData.categorized_places.map(
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
    </S.SearchMap>
  );
};

export default SearchMap;
