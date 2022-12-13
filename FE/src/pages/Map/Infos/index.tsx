import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ModalContent from '../ModalContent';

import * as S from './Infos.style';

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

  const { data: placeDetailInfo, refetch } = useQuery(
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
    refetch();
  };

  return (
    infoData && (
      <S.MapInfos>
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
                <S.Item>
                  <S.ItemCategory>
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
                  </S.ItemCategory>
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
                  {/* <Text
                    size="small"
                    text={place.place_url}
                    color={theme.color.lightGray}
                  /> */}
                </S.Item>
              </Card>
            ))
          )}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <ModalContent placeInfo={placeDetailInfo} />
          </GlobalModal>
        )}
      </S.MapInfos>
    )
  );
};

export default Infos;
