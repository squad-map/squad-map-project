import { useQuery } from 'react-query';

import Header from '../MyMap/Header';
import Infos from '../MyMap/Infos';

import { KakaoMap } from '@/components/KaKaoMap';

const getMyMapData = async () => {
  const response = await fetch('/mymap');
  const myMapData = await response.json();
  return myMapData;
};

const Maps = () => {
  const { data: myMapData, isLoading: loading } = useQuery(['myMap'], () =>
    getMyMapData()
  );

  return (
    myMapData && (
      <KakaoMap placeInfos={myMapData.maps}>
        <Header
          headerData={{
            emoji: myMapData.emoji,
            title: myMapData.title,
            categories: myMapData.categories,
          }}
        />
        <Infos infoData={myMapData.maps} />
      </KakaoMap>
    )
  );
};

export default Maps;
