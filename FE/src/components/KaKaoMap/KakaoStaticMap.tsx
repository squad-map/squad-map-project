import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { PlaceDetail } from '@/interfaces/Place';
import { PlaceType } from '@/types/map';

const { kakao } = window as any;

const KakaoStaticMap = ({
  placeInfo,
}: {
  placeInfo: PlaceType | PlaceDetail;
}) => {
  const mapRef = useRef<HTMLElement | null>(null);
  const staticMapLink = `https://map.kakao.com/?itemId=${placeInfo.place_id}`;

  useEffect(() => {
    const container = document.getElementById('static_map');
    if (kakao) {
      const options = {
        center: new kakao.maps.LatLng(placeInfo.longitude, placeInfo.latitude),
        level: 5,
      };
      mapRef.current = new kakao.maps.Map(container, options);
    }
  }, [placeInfo]);

  return (
    <Link to={staticMapLink} target="_blank">
      <div className="w-[26.75rem] h-[15.625rem] rounded-2xl" id="static_map" />
    </Link>
  );
};

export default KakaoStaticMap;
