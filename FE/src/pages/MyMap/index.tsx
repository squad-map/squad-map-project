import { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';

import Header from './Header';
import Infos from './Infos';
import Modal from './Modal';
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

  const { id } = useParams();
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');

  const mapRef = useRef<HTMLElement | null | any>(null);

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
  }, [mapRef, myLocation]);

  useEffect(() => {
    if (myLocation && myMapData) {
      const markers = myMapData.maps.map(
        (map: MapType) =>
          new naver.maps.Marker({
            position: new naver.maps.LatLng(map.lat, map.lng),
            map: mapRef.current,
            icon: {
              content: [
                `<img id=marker-${map.id} src=${Icons.Map} alt="" class="fill-${map.color}" />`,
              ].join(''),
              size: new naver.maps.Size(38, 58),
              scaledSize: new naver.maps.Size(25, 34),
              anchor: new naver.maps.Point(19, 58),
            },
          })
      );

      const infos = myMapData.maps.map((map: MapType) => (
        <Modal id={`Modal-${map.id}`} map={map} />
      ));

      // 마커 위에 infos 달아주기.
      // 위 markers를 만들어줄때 content 영역에 심어두기?
      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(markers[i], 'click', () => {
          // infos
        });
      }
    }
  }, [myLocation, myMapData]);

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
