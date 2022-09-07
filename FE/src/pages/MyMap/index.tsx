import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Header from './Header';
import Infos from './Infos';
import * as S from './MyMap.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { defaultCoords } from '@/constants/map';
import theme from '@/styles/theme';
import { MapType } from '@/types/map';

const getMyMapData = async () => {
  const response = await fetch('/mymap');
  const myMapData = await response.json();
  return myMapData;
};

const MyMap = () => {
  const { data: myMapData, isLoading: loading } = useQuery(['myMap'], () =>
    getMyMapData()
  );

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

  useEffect(() => {
    if (myLocation && myMapData) {
      const markers = myMapData.maps.map(
        (map: MapType) =>
          new naver.maps.Marker({
            position: new naver.maps.LatLng(map.lat, map.lng),
            map: mapRef.current,
            icon: {
              content: [
                `<img id=marker-${map.id} src=${Icons.Map} alt="marker img" class="fill-${map.color}" />`,
              ].join(''),
              size: new naver.maps.Size(38, 58),
              scaledSize: new naver.maps.Size(25, 34),
              anchor: new naver.maps.Point(19, 58),
            },
          })
      );

      const infoWindows = myMapData.maps.map(
        (map: MapType) =>
          new naver.maps.InfoWindow({
            content: `<button
            id=button-${map.id}
            type="button"
            class="info-button"
            onclick="((e) => {
              const id = e.target.id;
            })(arguments[0])"
        >${map.address}</button>`,
            zIndex: 999,
            borderWidth: 0,
            disableAnchor: true,
            backgroundColor: 'transparent',
            pixelOffset: new naver.maps.Point(0, -10),
          })
      );

      // 마커 위에 infos 달아주기.
      // 위 markers를 만들어줄때 content 영역에 심어두기?
      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(mapRef.current, 'click', () => {
          const infoWindow = infoWindows[i];
          infoWindow.close();
        });

        naver.maps.Event.addListener(markers[i], 'click', () => {
          const infoWindow = infoWindows[i];
          const marker = markers[i];
          if (infoWindow && marker) {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(mapRef.current, marker);
            }
          }
        });
      }
    }
  }, [myLocation, myMapData]);

  return (
    <S.MyMap id="map" style={{ width: '100vw', height: '100vh' }}>
      {myMapData && (
        <>
          <Header
            headerData={{
              emoji: myMapData.emoji,
              title: myMapData.title,
              categories: myMapData.categories,
            }}
          />
          <Infos
            infoData={{
              maps: myMapData.maps,
            }}
          />
          <S.RecommendationButtonWrapper>
            <Link to={`/mymap/search/${myMapData.id}`}>
              <Button
                size="large"
                color={theme.color.brown}
                background={`url(${Icons.Plus}) no-repeat right 1rem`}
              >
                <Text
                  text="장소 추천하기"
                  size="large"
                  color={theme.color.black}
                />
              </Button>
            </Link>
          </S.RecommendationButtonWrapper>
        </>
      )}
    </S.MyMap>
  );
};

export default MyMap;
