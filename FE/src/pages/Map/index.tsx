import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getMapDetailInfo } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoMap from '@/components/KaKaoMap';
import Header from '@/components/Map/Header';
import Infos from '@/components/Map/Infos';
import { SUCCESS_GET_DETAIL_MAP } from '@/constants/code';
import theme from '@/styles/theme';
import { CategorizedPlaces, MapUserType, PlaceType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

const Map = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<MapUserType>({
    host_id: 0,
    host_nickname: '',
    host_profile_image: '',
  });

  const { data: mapData, refetch: refetchMap } = useQuery(['Map'], () => {
    if (id) {
      return getMapDetailInfo(+id);
    }
    return true;
  });

  useEffect(() => {
    if (mapData && !userProfile.host_id) {
      setUserProfile({
        host_id: mapData.data.host_id,
        host_nickname: mapData.data.host_nickname,
        host_profile_image: mapData.data.host_profile_image,
      });
    }
  }, [mapData, userProfile]);

  if (mapData && mapData.code !== SUCCESS_GET_DETAIL_MAP)
    return <div>API Error</div>;

  return (
    mapData && (
      <KakaoMap
        placeInfos={mapData.data.categorized_places.reduce(
          (acc: PlaceType[], placeInfo: CategorizedPlaces) => {
            acc.push(...placeInfo.places);
            return acc;
          },
          []
        )}
      >
        <Header
          headerData={{
            map_id: mapData.data.map_id,
            emoji: `${unicodeToEmoji(mapData.data.map_emoji)}`,
            title: mapData.data.map_name,
            category_info: mapData.data.categorized_places.map(
              (placeInfo: CategorizedPlaces) => placeInfo.category_info
            ),
          }}
          refetchMap={refetchMap}
        />
        <Infos
          mapHostId={mapData.data.host_id}
          infoData={mapData.data.categorized_places}
          userProfile={userProfile}
          refetchMap={refetchMap}
        />
        <div className="absolute bottom-8 right-8 z-[999]">
          <Link to={`/map/search/${mapData.data.map_id}`}>
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
