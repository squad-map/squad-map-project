import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getMapDetailInfo } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Navigation from '@/components/common/Navigation';
import Text from '@/components/common/Text';
import KakaoMap from '@/components/KaKaoMap';
import BackButton from '@/components/Map/BackButton/BackButton';
import Categories from '@/components/Map/Categories/Categories';
import Infos from '@/components/Map/Infos';
import { SUCCESS_GET_DETAIL_MAP } from '@/constants/code';
import { defaultCoords } from '@/constants/map';
import { useGetMapId } from '@/hooks/useGetMapId';
import theme from '@/styles/theme';
import { CategorizedPlaces, MapUserType, PlaceType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

const Map = () => {
  const mapId = useGetMapId();
  const [menu, setMenu] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({
    lat: defaultCoords.lat,
    lng: defaultCoords.lng,
  });
  const handleOpenMenu = () => setMenu(true);
  const handleCloseMenu = () => setMenu(false);
  const [userProfile, setUserProfile] = useState<MapUserType>({
    host_id: 0,
    host_nickname: '',
    host_profile_image: '',
  });
  const [placeInfos, setPlaceInfos] = useState([]);

  const {
    data: mapData,
    isLoading: mapDetailLoading,
    refetch: refetchMap,
  } = useQuery(['Map'], () => getMapDetailInfo(mapId));

  const handleCategoryClick = (color: string) => {
    const filteredMapData = mapData.data.categorized_places.filter(
      (category: any) => {
        if (category.category_info.category_color === color) {
          return category.places;
        }
      }
    )[0];

    setPlaceInfos(filteredMapData.places);
  };

  useEffect(() => {
    if (mapData) {
      const filteredMapData = mapData.data.categorized_places.reduce(
        (acc: PlaceType[], placeInfo: CategorizedPlaces) => {
          acc.push(...placeInfo.places);
          return acc;
        },
        []
      );
      setPlaceInfos(filteredMapData);

      if (!userProfile.host_id) {
        setUserProfile({
          host_id: mapData.data.host_id,
          host_nickname: mapData.data.host_nickname,
          host_profile_image: mapData.data.host_profile_image,
        });
      }
    }
  }, [mapData, userProfile]);

  if (!mapDetailLoading && mapData.code !== SUCCESS_GET_DETAIL_MAP)
    return <div>API Error</div>;

  if (mapDetailLoading) return <LoadingSpinner size="xLarge" />;

  return (
    mapData && (
      <KakaoMap placeInfos={placeInfos} currentCoords={currentCoords}>
        <header className="h-16 flex items-center gap-4 absolute top-8 z-[999]">
          <BackButton
            emoji={`${unicodeToEmoji(mapData.data.map_emoji)}`}
            title={mapData.data.map_name}
          />
          <Categories
            headerData={{
              map_id: mapData.data.map_id,
              category_info: mapData.data.categorized_places.map(
                (placeInfo: CategorizedPlaces) => placeInfo.category_info
              ),
            }}
            handleCategoryClick={handleCategoryClick}
          />
        </header>
        <div className="fixed top-2 right-8 z-[1000]">
          <Image
            url={Images.Menu}
            alt="Navigation Menu"
            data-testid="menuBtn"
            onClick={handleOpenMenu}
          />
          <Navigation
            menu={menu}
            handleCloseMenu={handleCloseMenu}
            type="map"
          />
        </div>

        <div className="flex flex-col mt-12 gap-4">
          <Infos
            mapHostId={mapData.data.host_id}
            infoData={placeInfos}
            userProfile={userProfile}
            refetchMap={refetchMap}
            setCurrentCoords={setCurrentCoords}
          />

          <div className="absolute bottom-4 right-8 z-[999]">
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
        </div>
      </KakaoMap>
    )
  );
};

export default Map;
