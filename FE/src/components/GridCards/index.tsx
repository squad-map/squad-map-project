import { useQuery } from 'react-query';

import * as S from './GridCards.style';

import { Icons } from '@/assets/icons';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
import { IMap } from '@/interfaces/IMap';

const getMapsData = async () => {
  const response = await fetch('/');
  const maps = await response.json();
  return maps;
};

const GridCards = () => {
  // Loading 처리 필요.
  const { data: mapsData, isLoading: loading } = useQuery(['allMaps'], () =>
    getMapsData()
  );

  return (
    <S.GridCards>
      {mapsData &&
        mapsData.map((item: IMap) => (
          <Card size="small" key={item.id}>
            <S.Item>
              <Icon url={Icons.Sample} alt="카드 샘플 이미지" />
              <S.Title>{item.title}</S.Title>
              <S.Description>
                {item.emoji}
                {item.user}
                {item.placeCount}
              </S.Description>
            </S.Item>
          </Card>
        ))}
    </S.GridCards>
  );
};

export default GridCards;
