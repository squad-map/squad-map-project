import * as S from './GridCards.style';

import { Icons } from '@/assets/icons';
import Card from '@/components/common/Card';
import Icon from '@/components/common/Icon';
// interface IGridCards {}

const DummyCards = () => (
  <>
    {new Array(9).map(() => (
      <Card size="small">
        <S.Item>
          <Icon url={Icons.Sample} alt="카드 샘플 이미지" />
          <S.Title>Large Bold</S.Title>
          <S.Description>🍞 Muffin | 31개의 장소</S.Description>
        </S.Item>
      </Card>
    ))}
  </>
);

const GridCards = () => (
  <S.GridCards>
    <DummyCards />
  </S.GridCards>
);

export default GridCards;
