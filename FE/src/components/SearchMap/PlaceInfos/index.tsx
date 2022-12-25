import { useState } from 'react';

import SearchModalContent from '../SearchModalContent';

import * as S from './Infos.stories';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { PlaceType } from '@/types/map';

const PlaceInfos = ({ placeInfos }: { placeInfos: PlaceType[] }) => {
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);
  const [placeInfo, setPlaceInfo] = useState<PlaceType>();

  const handleClickPlace = (id: number) => {
    const clickedPlace = placeInfos.find(
      (place: PlaceType) => place.place_id === id
    );

    setPlaceInfo(clickedPlace);
    setIsOpenGlobalModal(true);
  };

  return (
    placeInfos && (
      <section className="h-[calc(100vh-10rem)] flex flex-col gap-4 mt-8 absolute right-0 overflow-y-scroll z-[1000]">
        {placeInfos.map &&
          placeInfos.map((place: PlaceType) => (
            <Card
              size="large"
              key={`InfoCard-${place.place_id}`}
              color={theme.color.white}
            >
              <div className="flex flex-col gap-8">
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
                <Button
                  size="small"
                  color={theme.color.navy}
                  onClick={() => handleClickPlace(place.place_id)}
                >
                  <Text
                    size="small"
                    text="선택하기"
                    color={theme.color.white}
                  />
                </Button>
              </div>
            </Card>
          ))}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <SearchModalContent placeInfo={placeInfo as PlaceType} />
          </GlobalModal>
        )}
      </section>
    )
  );
};

export default PlaceInfos;
