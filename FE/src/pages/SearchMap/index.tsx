import { useState } from 'react';

import * as S from './SearchMap.style';
import SearchPlace from './SearchPlace';

import { KakaoMap } from '@/components/KaKaoMap';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import Header from '@/pages/MyMap/Header';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const SearchMap = () => {
  const [placeInfos, setPlaceInfos] = useState<ISearchPlace[]>([]);
  // myMapData를 Client에서 가지고 있어야 한다. 그래야 라우팅이 변경되어도 해당 데이터를 가져올 수 있기 때문.
  const myMapData = {
    id: 1,
    title: '놀이동산',
    emoji: '🏞',
    categories: [
      { name: '카테고리1', color: '#FF0000' },
      { name: '카테고리2', color: '#0000FF' },
    ],
  };

  const placesSearchCallBack = (data: any, status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색 목록과 마커를 표출합니다 (보류)
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
    kakaoSearchService.keywordSearch(address, placesSearchCallBack);
  };

  return (
    <S.SearchMap>
      <KakaoMap>
        {myMapData && (
          <>
            <Header
              headerData={{
                emoji: myMapData.emoji,
                title: myMapData.title,
                categories: myMapData.categories,
              }}
            />
            <SearchPlace
              searchAddressToCoordinate={searchAddressToCoordinate}
              placeInfos={placeInfos}
            />
          </>
        )}
      </KakaoMap>
    </S.SearchMap>
  );
};

export default SearchMap;
