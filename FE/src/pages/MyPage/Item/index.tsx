import React from 'react';

import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';

interface ItemProps {
  item: IMyMap;
  handleModifyButton: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Item = ({ item, handleModifyButton }: ItemProps) => (
  <S.Item>
    <S.ItemHeader>
      <Text
        text={`${item.emoji} ${item.title}`}
        size="xRegularFill"
        color={theme.color.darkGray}
      />
      <Icon
        size="small"
        url={Icons.Edit}
        alt="Edit Icon"
        onClick={handleModifyButton}
      />
    </S.ItemHeader>
    <S.ItemFooter>
      <Text
        text={`${item.placeCount}개의장소`}
        size="xSmall"
        color={theme.color.gray}
      />
    </S.ItemFooter>
  </S.Item>
);

export default Item;
