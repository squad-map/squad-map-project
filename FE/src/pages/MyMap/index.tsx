import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as S from './MyMap.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';

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
  const markerRef = useRef<any | null>(null);

  const markerClickEvent = (marker: any) => {
    naver.maps.Event.addListener(marker, 'click', (e: any) => {
      const mapLatLng = new naver.maps.LatLng(37.491583, 127.031352);
      mapRef.current.panTo(mapLatLng, e?.coord);
    });
  };

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
    if (myLocation) {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.491581, 127.031352),
        map: mapRef.current,
        icon: {
          content: [`<img src=${Icons.Map} alt="" />`].join(''),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });
    }
  }, [myLocation]);

  useEffect(() => {
    const success = (position: any) => {
      setMyLocation({
        // latitude: position.coords.latitude,
        // longitude: position.coords.longitude,
        latitude: 37.490812,
        longitude: 127.033416,
      });
    };

    const error = () => {
      setMyLocation({ latitude: 37.490812, longitude: 127.033416 });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return <S.MyMap id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default MyMap;
