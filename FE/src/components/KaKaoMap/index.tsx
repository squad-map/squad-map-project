import { useState, useEffect, useRef } from 'react';

import { defaultCoords } from '@/constants/map';
import { PlaceType } from '@/types/map';

interface KakaoMapProps {
  children: React.ReactNode;
  placeInfos: PlaceType[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export const KakaoMap = ({ children, placeInfos }: KakaoMapProps) => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [markers, setMarkers] = useState([]) as any;

  const displayPlaces = (places: PlaceType[]) => {
    const sampleImageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(sampleImageSrc, imageSize);
    const newMarkers = [] as any;

    places.forEach((place: PlaceType) => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.longitude, place.latitude),
        image: markerImage,
        zIndex: 10,
      });

      newMarkers.push(marker);

      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: marker.getPosition(),
        content: `<button class="info-button">
            <span>${place.name}</span>
          </button>`,
        yAnchor: 1,
      });

      customOverlay.setMap(null);

      kakao.maps.event.addListener(marker, 'click', () => {
        if (customOverlay.getMap()) customOverlay.setMap(null);
        else customOverlay.setMap(mapRef.current);
      });
    });
    setMarkers(newMarkers);
  };

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(defaultCoords.lat, defaultCoords.lng),
      level: 5,
    };
    mapRef.current = new kakao.maps.Map(container, options);
  }, []);

  useEffect(() => {
    if (placeInfos.length > 0) {
      if (markers) {
        markers.forEach((marker: any) => marker.setMap(null));
      }
      displayPlaces(placeInfos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeInfos]);

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
