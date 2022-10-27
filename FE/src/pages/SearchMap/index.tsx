import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as S from './SearchMap.style';
import SearchPlace from './SearchPlace';

import { getMapDetailInfo } from '@/apis/mypage';
import { KakaoMap } from '@/components/KaKaoMap';
import { defaultCoords } from '@/constants/map';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import Header from '@/pages/Map/Header';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const SearchMap = () => {
  const { id } = useParams();
  const [placeInfos, setPlaceInfos] = useState<ISearchPlace[]>([]);

  const { data: mapData, isLoading: loading } = useQuery(['Map'], () => {
    if (id) {
      getMapDetailInfo(id);
    }
  });

  const placesSearchCallBack = (data: any, status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaceInfos(data);
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
      location: new kakao.maps.LatLng(defaultCoords.lat, defaultCoords.lng),
    });
  };

  return (
    <S.SearchMap>
      {mapData && (
        <KakaoMap placeInfos={placeInfos}>
          <Header
            headerData={{
              emoji: mapData.emoji,
              title: mapData.title,
              categories: mapData.categories,
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
