import { Link } from 'react-router-dom';

import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

interface ItemProps {
  item: IMyMap;
}

const Item = ({ item }: ItemProps) => (
  <S.Item>
    <S.ItemHeader>
      {item.categories.map((category: CategoryType) => (
        <Text
          text={category.name || ''}
          size="small"
          color={category.color || theme.color.black}
        />
      ))}
      <Link to="modify">
        <Icon size="small" url={Icons.Edit} alt="Edit Icon" />
      </Link>
    </S.ItemHeader>
    <Text
      text={`${item.emoji} ${item.title}`}
      size="xRegularFill"
      color={theme.color.black}
    />
    <S.ItemFooter>
      <Text
        text={`${item.placeCount}개의장소`}
        size="xSmall"
        color={theme.color.gray}
      />
      <Link to="modify">
        <Text text="수정하기" size="xSmall" color={theme.color.gray} />
      </Link>
    </S.ItemFooter>
  </S.Item>
);

export default Item;
