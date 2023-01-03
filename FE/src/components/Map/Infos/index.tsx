import { useState } from 'react';

import PlaceModalReview from '../PlaceModalReview';
import PlaceModalUpdate from '../PlaceModalUpdate';

import { getPlaceDeatilInfo } from '@/apis/place';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import UserProfile from '@/components/UserProfile';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';
import { CategorizedPlaces, MapUserType, PlaceType } from '@/types/map';

interface InfosProps {
  infoData: CategorizedPlaces[];
  userProfile: MapUserType;
}

const Infos = ({ infoData, userProfile }: InfosProps) => {
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const [placeDetailInfo, setPlaceDetailInfo] = useState<PlaceDetail>({
    place_id: 0,
    place_name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    story: '',
    detail_link: '',
    category_id: 0,
  });

  const handleClickPlace = async (type: 'GET' | 'UPDATE', id: number) => {
    const data = await getPlaceDeatilInfo(id);

    setPlaceDetailInfo(data);
    if (type === 'GET') {
      setIsOpenGlobalModal(true);
    } else {
      setIsOpenUpdateModal(true);
    }
  };

  return (
    infoData && (
      <section className="flex flex-col gap-4 max-h-[38rem] mt-8 p-1 absolute right-4 z-[999]">
        <Button size="large" color={theme.color.navy}>
          <Text size="large" text="🍞 Muffin" color={theme.color.white} />
        </Button>
        {infoData &&
          infoData.map((info: CategorizedPlaces) =>
            info.places.map((place: PlaceType) => (
              <Card
                size="large"
                key={`InfoCard-${place.place_id}`}
                color={theme.color.white}
              >
                <div className="h-full flex flex-col gap-8">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        size="xSmall"
                        color={info.category_info.category_color}
                        key={`categoryButton-${info.category_info.category_name}`}
                      >
                        <Text
                          size="xSmall"
                          text={info.category_info.category_name}
                          color={theme.color.white}
                        />
                      </Button>
                      <Icon
                        size="small"
                        url={Icons.More}
                        alt="정보 더보기"
                        onClick={() => handleClickPlace('GET', place.place_id)}
                      />
                    </div>
                    <Button
                      size="xSmall"
                      color={theme.color.navy}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleClickPlace('UPDATE', place.place_id);
                      }}
                    >
                      <Text
                        text="장소수정"
                        size="xSmall"
                        color={theme.color.white}
                      />
                    </Button>
                  </div>
                  <Text
                    size="xRegular"
                    text={place.place_name}
                    color={theme.color.lightGreen}
                  />
                  <Text
                    size="small"
                    text={place.address}
                    color={theme.color.gray}
                  />
                  <UserProfile userProfile={userProfile} />
                </div>
              </Card>
            ))
          )}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <PlaceModalReview placeInfo={placeDetailInfo} />
          </GlobalModal>
        )}
        {isOpenUpdateModal && (
          <GlobalModal
            size="medium"
            handleCancelClick={() => setIsOpenUpdateModal(false)}
          >
            <PlaceModalUpdate
              placeInfo={placeDetailInfo}
              categoryInfo={infoData.map(data => data.category_info)}
            />
          </GlobalModal>
        )}
      </section>
    )
  );
};

export default Infos;
