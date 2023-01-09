import { useEffect, useRef } from 'react';

import * as S from './KakaoMap.style';

import { PlaceType } from '@/types/map';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const KakaoStaticMap = ({ placeInfo }: { placeInfo: PlaceType }) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const staticMapLink = `https://map.kakao.com/?itemId=${placeInfo.place_id}`;

  useEffect(() => {
    const container = document.getElementById('static_map');
    const options = {
      center: new kakao.maps.LatLng(placeInfo.longitude, placeInfo.latitude),
      level: 5,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, [placeInfo]);

  return <S.StaticMap id="static_map" href={staticMapLink} target="_blank" />;
};

export default KakaoStaticMap;
