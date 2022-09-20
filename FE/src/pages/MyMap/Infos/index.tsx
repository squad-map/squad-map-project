import { useState } from 'react';

import * as S from './Infos.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

interface InfosProps {
  infoData: {
    maps: [
      {
        id: number;
        title: string;
        category: CategoryType;
        address: string;
        description: string;
      }
    ];
  };
}

const Infos = ({ infoData }: InfosProps) => {
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);

  return (
    infoData && (
      <S.MapInfos>
        <Button size="large" color={theme.color.navy}>
          <Text size="large" text="🍞 Muffin" color={theme.color.white} />
        </Button>
        {infoData.maps &&
          infoData.maps.map(map => (
            <Card
              size="large"
              key={`InfoCard-${map.id}`}
              color={theme.color.white}
            >
              <S.Item>
                <S.ItemCategory>
                  <Button
                    size="xSmall"
                    color={map.category.color}
                    key={`categoryButton-${map.category.name}`}
                  >
                    <Text
                      size="xSmall"
                      text={map.category.name}
                      color={theme.color.white}
                    />
                  </Button>
                  <Icon
                    size="small"
                    url={Icons.More}
                    alt="정보 더보기"
                    onClick={() => setIsOpenGlobalModal(true)}
                  />
                </S.ItemCategory>
                <Text
                  size="xRegular"
                  text={map.title}
                  color={theme.color.lightGreen}
                />
                <Text
                  size="small"
                  text={map.address}
                  color={theme.color.gray}
                />
                <Text
                  size="small"
                  text={map.description}
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
            <div>Modal Content 제작 예정</div>
          </GlobalModal>
        )}
      </S.MapInfos>
    )
  );
};

export default Infos;
