import React from 'react';

import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

interface ItemProps {
  item: IMyMap;
  handleModifyButton: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Item = ({ item, handleModifyButton }: ItemProps) => (
  <S.Item>
    <S.ItemHeader>
      {item.categories.map((category: CategoryType) => (
        <Text
          text={category.name || ''}
          size="small"
          color={category.color || theme.color.black}
        />
      ))}

      <Icon
        size="small"
        url={Icons.Edit}
        alt="Edit Icon"
        onClick={handleModifyButton}
      />
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

      <Text text="수정하기" size="xSmall" color={theme.color.gray} />
    </S.ItemFooter>
  </S.Item>
);

export default Item;
