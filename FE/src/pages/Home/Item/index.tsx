import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import { IMap } from '@/interfaces/IMap';

interface ItemProps {
  item: IMap;
}

const Item = ({ item }: ItemProps) => (
  <S.Item>
    <Icon size="medium" url={Icons.Sample} alt="카드 샘플 이미지" />
    <S.Title>{item.title}</S.Title>
    <S.Description>
      {item.emoji}
      {item.user}
      {item.placeCount}
    </S.Description>
  </S.Item>
);

export default Item;
