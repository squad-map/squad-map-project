import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Header from './Header';
import Infos from './Infos';

import { getMapDetailInfo } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { KakaoMap } from '@/components/KaKaoMap';
import theme from '@/styles/theme';
import { CategorizedPlaces, MapUserType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

const Map = () => {
  const { id } = useParams();
  const [user, setUser] = useState<MapUserType>({
    host_id: 0,
    host_nickname: '',
    host_profile_image: '',
  });

  const { data: mapData } = useQuery(['Map'], () => {
    if (id) {
      return getMapDetailInfo(id);
    }
    return true;
  });

  useEffect(() => {
    if (mapData) {
      setUser({
        host_id: mapData.host_id,
        host_nickname: mapData.host_nickname,
        host_profile_image: mapData.host_profile_image,
      });
    }
  }, [mapData]);

  return (
    mapData && (
      <KakaoMap
        placeInfos={mapData.categorized_places.reduce(
          (acc: any, placeInfo: CategorizedPlaces) => {
            acc.push(...placeInfo.places);
            return acc;
          },
          []
        )}
      >
        <Header
          headerData={{
            map_id: mapData.map_id,
            emoji: `${unicodeToEmoji(mapData.map_emoji)}`,
            title: mapData.map_name,
            category_info: mapData.categorized_places.map(
              (placeInfo: CategorizedPlaces) => placeInfo.category_info
            ),
          }}
        />
        <Infos infoData={mapData.categorized_places} user={user} />
        <div className="absolute bottom-8 right-8 z-[999]">
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
        </div>
      </KakaoMap>
    )
  );
};

export default Map;
