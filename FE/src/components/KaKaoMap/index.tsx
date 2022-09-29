import { useEffect, useRef } from 'react';

import { defaultCoords } from '@/constants/map';
import { MapType } from '@/types/map';

interface KakaoMapProps {
  children: React.ReactNode;
  myMapData?: MapType[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const KakaoMap = ({ children, myMapData }: KakaoMapProps) => {
  const mapRef = useRef<HTMLElement | null | any>(null);

  const displayPlaces = (places: MapType[]) => {
    const sampleImageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(sampleImageSrc, imageSize);

    places.forEach((data: MapType) => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(data.lat, data.lng),
        image: markerImage,
      });

      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: marker.getPosition(),
        content: `<button class="info-button">
            <span>${data.title}</span>
          </button>`,
        yAnchor: 1,
      });

      kakao.maps.event.addListener(marker, 'click', (e: any) => {
        // overlay click event listener 작업 예정
        customOverlay.setMap(mapRef.current);
      });
    });
  };

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(defaultCoords.lat, defaultCoords.lng),
      level: 3,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, [myMapData]);

  useEffect(() => {
    displayPlaces(myMapData);
  }, [myMapData]);

  return (
    <div
      id="myMap"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};
