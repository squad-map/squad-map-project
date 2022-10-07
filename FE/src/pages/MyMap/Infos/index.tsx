import { useState } from 'react';

import ModalContent from '../ModalContent';

import * as S from './Infos.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import theme from '@/styles/theme';

const Infos = ({ infoData }: { infoData: ISearchPlace[] }) => {
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);
  const [clickedPlace, setClickedPlace] = useState<ISearchPlace>();

  const handleClickPlaceInfo = (data: ISearchPlace) => {
    setClickedPlace(data);
    setIsOpenGlobalModal(true);
  };

  return (
    infoData && (
      <S.MapInfos>
        <Button size="large" color={theme.color.navy}>
          <Text size="large" text="🍞 Muffin" color={theme.color.white} />
        </Button>
        {infoData &&
          infoData.map((data: ISearchPlace) => (
            <Card
              size="large"
              key={`InfoCard-${data.id}`}
              color={theme.color.white}
            >
              <S.Item>
                <S.ItemCategory>
                  <Button
                    size="xSmall"
                    color={data.category_color}
                    key={`categoryButton-${data.category_name}`}
                  >
                    <Text
                      size="xSmall"
                      text={data.category_name}
                      color={theme.color.white}
                    />
                  </Button>
                  <Icon
                    size="small"
                    url={Icons.More}
                    alt="정보 더보기"
                    onClick={() => handleClickPlaceInfo(data)}
                  />
                </S.ItemCategory>
                <Text
                  size="xRegular"
                  text={data.place_name}
                  color={theme.color.lightGreen}
                />
                <Text
                  size="small"
                  text={data.address_name}
                  color={theme.color.gray}
                />
                <Text
                  size="small"
                  text={data.place_url}
                  color={theme.color.lightGray}
                />
              </S.Item>
            </Card>
          ))}
        {isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <ModalContent placeInfo={clickedPlace as ISearchPlace} />
          </GlobalModal>
        )}
      </S.MapInfos>
    )
  );
};

export default Infos;
