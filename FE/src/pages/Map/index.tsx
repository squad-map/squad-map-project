import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import Header from './Header';
import Infos from './Infos';
import * as S from './Map.style';

import { getMapDetailInfo } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import { KakaoMap } from '@/components/KaKaoMap';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

const Map = () => {
  const { id } = useParams();
  const { data: mapData, isLoading: loading } = useQuery(
    ['Map'],
    () => {
      if (id) {
        return getMapDetailInfo(id);
      }
      return true;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <LoadingSpinner size="xLarge" />
      ) : (
        mapData && (
          <KakaoMap placeInfos={mapData.categorized_places}>
            <Header
              headerData={{
                emoji: `${unicodeToEmoji(mapData.map_emoji)}`,
                title: mapData.map_name,
                categories: mapData.categories,
              }}
            />
            <Infos infoData={mapData.categorized_places} />
            <S.RecommendationButtonWrapper>
              <Link to={`/map/search/${mapData.map_id}`}>
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
        )
      )}
    </>
  );
};

export default Map;
