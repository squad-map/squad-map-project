import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Header from './Header';
import Infos from './Infos';
import * as S from './MyMap.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { KakaoMap } from '@/components/KaKaoMap';
import theme from '@/styles/theme';

const getMyMapData = async () => {
  const response = await fetch('/mymap');
  const myMapData = await response.json();
  return myMapData;
};

const MyMap = () => {
  const { data: myMapData, isLoading: loading } = useQuery(['myMap'], () =>
    getMyMapData()
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {myMapData ? (
        <KakaoMap placeInfos={myMapData.maps}>
          <Header
            headerData={{
              emoji: myMapData.emoji,
              title: myMapData.title,
              categories: myMapData.categories,
            }}
          />
          <Infos infoData={myMapData.maps} />
          <S.RecommendationButtonWrapper>
            <Link to={`/mymap/search/${myMapData.id}`}>
              <Button
                size="large"
                color={theme.color.navy}
                background={`url(${Icons.Plus}) no-repeat right 1rem`}
              >
                <Text
                  text="장소 추가하기"
                  size="large"
                  color={theme.color.white}
                />
              </Button>
            </Link>
          </S.RecommendationButtonWrapper>
        </KakaoMap>
      ) : (
        <div>${loading}</div>
      )}
    </>
  );
};

export default MyMap;
