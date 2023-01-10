import { useState } from 'react';

import ModalContent from '../ModalContent';

import * as S from './Infos.style';

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
      <S.PlaceInfos>
        {placeInfos.map &&
          placeInfos.map((place: PlaceType) => (
            <Card
              size="large"
              key={`InfoCard-${place.place_id}`}
              color={theme.color.white}
            >
              <S.Item>
                <Text
                  size="xRegular"
                  text={place.name}
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
              </S.Item>
            </Card>
          ))}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <ModalContent placeInfo={placeInfo as PlaceType} />
          </GlobalModal>
        )}
      </S.PlaceInfos>
    )
  );
};

export default PlaceInfos;
