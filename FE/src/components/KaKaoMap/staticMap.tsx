import { useEffect, useRef } from 'react';

import * as S from './KakaoMap.style';

import { ISearchPlace } from '@/interfaces/ISearchPlace';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

interface KakaoStaticMapProps {
  placeInfo: ISearchPlace;
}

const KakaoStaticMap = ({ placeInfo }: KakaoStaticMapProps) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const staticMapLink = `https://map.kakao.com/?itemId=${placeInfo.id}`;

  useEffect(() => {
    const container = document.getElementById('static_map');
    const options = {
      center: new kakao.maps.LatLng(placeInfo.y, placeInfo.x),
      level: 5,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, [placeInfo]);

  return <S.StaticMap id="static_map" href={staticMapLink} target="_blank" />;
};

export default KakaoStaticMap;
