import { useState } from 'react';

import * as S from './Infos.style';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import theme from '@/styles/theme';

const PlaceInfos = ({ placeInfos }: { placeInfos: ISearchPlace[] }) => {
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);

  return (
    placeInfos && (
      <S.PlaceInfos>
        {placeInfos.map &&
          placeInfos.map((map: ISearchPlace) => (
            <Card
              size="large"
              key={`InfoCard-${map.id}`}
              color={theme.color.white}
            >
              <S.Item>
                <Text
                  size="xRegular"
                  text={map.place_name}
                  color={theme.color.lightGreen}
                />
                <Text
                  size="small"
                  text={map.address_name}
                  color={theme.color.gray}
                />
                <Text
                  size="small"
                  text={map.category_name}
                  color={theme.color.lightGray}
                />
                <Button
                  size="small"
                  color={theme.color.navy}
                  onClick={() => setIsOpenGlobalModal(true)}
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
            <div>Modal Content 제작 예정</div>
          </GlobalModal>
        )}
      </S.PlaceInfos>
    )
  );
};

export default PlaceInfos;
