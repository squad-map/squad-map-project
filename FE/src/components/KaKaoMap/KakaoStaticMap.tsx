import { useEffect, useRef } from 'react';

import { PlaceDetail } from '@/interfaces/Place';
import { PlaceType } from '@/types/map';

const { kakao } = window as any;

const KakaoStaticMap = ({
  placeInfo,
}: {
  placeInfo: PlaceType | PlaceDetail;
}) => {
  const kakaoMapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById('static_map');

    if (kakao) {
      const options = {
        center: new kakao.maps.LatLng(placeInfo.latitude, placeInfo.longitude),
        level: 5,
      };
      kakaoMapRef.current = new kakao.maps.Map(container, options);
    }
  }, [placeInfo.latitude, placeInfo.longitude]);

  return (
    <a href={placeInfo.detail_link} target="_blank" rel="noreferrer">
      <div className="w-[26.75rem] h-[10.625rem] rounded-2xl" id="static_map" />
    </a>
  );
};

export default KakaoStaticMap;
