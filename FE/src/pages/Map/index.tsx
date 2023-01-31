import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

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
import CategoryManagement from '@/components/Map/CategoryManagement';
import Infos from '@/components/Map/Infos';
import { SUCCESS_GET_DETAIL_MAP } from '@/constants/code';
import { defaultCoords } from '@/constants/map';
import { useGetMapId } from '@/hooks/useGetMapId';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';
import { CategorizedPlaces, PlaceType } from '@/types/map';
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

  const [filterText, setFilterText] = useState('모든 지도 리스트');
  const [placeInfos, setPlaceInfos] = useState([]);
  const user = useRecoilValue(userState);

  const { data: mapData, isLoading: mapDetailLoading } = useQuery(
    ['Map', mapId],
    () => getMapDetailInfo(mapId)
  );

  const handleAllClick = () => {
    const filteredMapData = mapData.data.categorized_places.reduce(
      (acc: PlaceType[], placeInfo: CategorizedPlaces) => {
        acc.push(...placeInfo.places);
        return acc;
      },
      []
    );

    setFilterText('모든 지도 리스트');
    setPlaceInfos(filteredMapData);
  };

  const handleCategoryClick = (color: string) => {
    const filteredMapData = mapData.data.categorized_places.reduce(
      (acc: PlaceType[], placeInfo: CategorizedPlaces) => {
        if (placeInfo.category_info.category_color === color)
          acc.push(...placeInfo.places);
        return acc;
      },
      []
    );

    setFilterText('카테고리별 장소 리스트');
    setPlaceInfos(filteredMapData);
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
    }
  }, [mapData]);

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
          <Button
            size="regular"
            color={theme.color.black}
            onClick={handleAllClick}
          >
            모두보기
          </Button>
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
        <CategoryManagement />
        <div className="w-[21.25rem] flex flex-col gap-4 fixed top-2 right-8 z-[999]">
          <div className="w-[21.25rem] flex justify-between items-center">
            <div className="flex w-[15rem] h-16 px-4 rounded-2xl bg-navy">
              <div className="flex gap-4 items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.profileImageUrl}
                  alt="프로필이미지"
                />
                <Text
                  size="large"
                  text={user?.nickname || ''}
                  color={theme.color.white}
                />
              </div>
            </div>
            <Image
              url={Images.Menu}
              alt="Navigation Menu"
              data-testid="menuBtn"
              onClick={handleOpenMenu}
            />
            <Navigation menu={menu} handleCloseMenu={handleCloseMenu} />
          </div>
          <div className="w-[21.25rem] ml-auto h-12 flex justify-center items-center px-4 rounded-2xl bg-clearOrange">
            <span className="text-2xl text-white">{filterText}</span>
          </div>
        </div>

        <div className="flex flex-col mt-12 gap-4">
          <Infos
            mapHostId={mapData.data.host_id}
            infoData={placeInfos}
            userProfile={{
              host_id: mapData.data.host_id,
              host_nickname: mapData.data.host_nickname,
              host_profile_image: mapData.data.host_profile_image,
            }}
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
