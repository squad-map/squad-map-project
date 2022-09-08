import { useState, useEffect, useRef } from 'react';

import * as S from './Maps.style';

import { defaultCoords } from '@/constants/map';

const Maps = () => {
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const mapRef = useRef<HTMLElement | null | any>(null);

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

  return <S.Maps id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default Maps;
