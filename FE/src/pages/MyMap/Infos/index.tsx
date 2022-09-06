import * as S from './Infos.style';

import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

interface InfosProps {
  infoData: {
    maps: [
      {
        id: number;
        title: string;
        categories: CategoryType[];
        address: string;
        description: string;
      }
    ];
  };
}

const Infos = ({ infoData }: InfosProps) =>
  infoData && (
    <S.MapInfos>
      <Button size="large" color={theme.color.white}>
        <Text size="large" text="🍞 Muffin" color={theme.color.gray} />
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
                {map.categories &&
                  map.categories.map((category: CategoryType) => (
                    <Button
                      size="xSmall"
                      color={category.color}
                      key={`categoryButton-${category.name}`}
                    >
                      <Text
                        size="xSmall"
                        text={category.name}
                        color={theme.color.white}
                      />
                    </Button>
                  ))}
              </S.ItemCategory>
              <Text
                size="xRegular"
                text={map.title}
                color={theme.color.lightGreen}
              />
              <Text size="small" text={map.address} color={theme.color.gray} />
              <Text
                size="small"
                text={map.description}
                color={theme.color.lightGray}
              />
            </S.Item>
          </Card>
        ))}
    </S.MapInfos>
  );

export default Infos;
