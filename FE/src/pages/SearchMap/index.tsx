import { useEffect, useState, useRef } from 'react';

import * as S from './SearchMap.style';
import SearchPlace from './SearchPlace';

import { defaultCoords } from '@/constants/map';
import Header from '@/pages/MyMap/Header';

const SearchMap = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);

  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

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

  useEffect(() => {
    const success = (position: any) => {
      setMyLocation({
        latitude: defaultCoords.lat,
        longitude: defaultCoords.lng,
      });
    };

    const error = () => {
      setMyLocation({
        latitude: defaultCoords.lat,
        longitude: defaultCoords.lng,
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string')
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.LEFT_CENTER,
        },
      });
  }, [myLocation]);

  return (
    <S.SearchMap id="map" style={{ width: '100vw', height: '100vh' }}>
      {myMapData && (
        <>
          <Header
            headerData={{
              emoji: myMapData.emoji,
              title: myMapData.title,
              categories: myMapData.categories,
            }}
          />
          <SearchPlace />
        </>
      )}
    </S.SearchMap>
  );
};

export default SearchMap;
