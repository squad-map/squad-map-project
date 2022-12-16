import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import PlaceModalContent from '../PlaceModalContent';

import { getPlaceDeatilInfo } from '@/apis/place';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';
import { CategorizedPlaces, PlaceType } from '@/types/map';

const Infos = ({ infoData }: { infoData: CategorizedPlaces[] }) => {
  const [clickedPlace, setClickedPlace] = useState<number>(0);
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);

  const { data: placeDetailInfo, refetch: refetchDetailMap } = useQuery(
    ['DetailMap'],
    () => {
      if (clickedPlace) {
        return getPlaceDeatilInfo(clickedPlace);
      }
      return true;
    },
    {
      onSuccess: (data: PlaceDetail) => {
        if (data.place_id) {
          setIsOpenGlobalModal(true);
        }
      },
    }
  );

  const handleClickPlace = (id: number) => {
    setClickedPlace(id);
  };

  useEffect(() => {
    if (clickedPlace) {
      refetchDetailMap();
    }
  }, [clickedPlace, refetchDetailMap]);

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
                        onClick={() => handleClickPlace(place.place_id)}
                      />
                    </div>
                    <Button
                      size="xSmall"
                      color={theme.color.navy}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
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
                </div>
              </Card>
            ))
          )}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <PlaceModalContent placeInfo={placeDetailInfo} />
          </GlobalModal>
        )}
      </section>
    )
  );
};

export default Infos;
