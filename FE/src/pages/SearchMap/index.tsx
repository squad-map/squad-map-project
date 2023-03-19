import { useState } from 'react';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import KakaoMap from '@/components/KaKaoMap';
import BackButton from '@/components/Map/BackButton/BackButton';
import SearchPlace from '@/components/SearchMap/SearchPlace';
import { SUCCESS_GET_DETAIL_MAP } from '@/constants/code';
import { defaultCoords } from '@/constants/map';
import useGetMapDetailInfo from '@/hooks/query/useGetMapDetailInfo';
import { SearchPlaceType } from '@/interfaces/SearchPlace';
import { PlaceType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

const { kakao } = window as any;

const SearchMap = () => {
  const [placeInfos, setPlaceInfos] = useState<PlaceType[]>([]);
  const [currentCoords, setCurrentCoords] = useState({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  });

  const { mapData, mapLoading } = useGetMapDetailInfo();

  const placesSearchCallBack = (data: SearchPlaceType[], status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      const searchPlaceInfos = data.map((place: SearchPlaceType) => ({
        place_id: +place.id,
        place_name: place.place_name,
        address: place.address_name,
        latitude: +place.y,
        longitude: +place.x,
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
    if (kakao) {
      const kakaoSearchService = new kakao.maps.services.Places();
      kakaoSearchService.keywordSearch(address, placesSearchCallBack, {
        location: new kakao.maps.LatLng(defaultCoords.lng, defaultCoords.lat),
      });
    }
  };

  if (!mapLoading && mapData.code !== SUCCESS_GET_DETAIL_MAP)
    return <div>API Error</div>;

  if (mapLoading) return <LoadingSpinner size="xLarge" />;

  return (
    <section>
      {mapData && (
        <KakaoMap placeInfos={placeInfos} currentCoords={currentCoords}>
          <header className="h-16 flex items-center gap-4 absolute top-8 z-[999]">
            <BackButton
              emoji={`${unicodeToEmoji(mapData.data.map_emoji)}`}
              title={mapData.data.map_name}
            />
          </header>
          <SearchPlace
            searchAddressToCoordinate={searchAddressToCoordinate}
            placeInfos={placeInfos}
            setCurrentCoords={setCurrentCoords}
          />
        </KakaoMap>
      )}
    </section>
  );
};

export default SearchMap;
