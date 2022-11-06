import { Link } from 'react-router-dom';

import * as S from './Item.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: IMyMap;
}

const Item = ({ item }: ItemProps) => (
  <S.Item>
    <S.ItemHeader>
      <Text
        text={`${unicodeToEmoji(item.map_emoji)} ${item.map_name}`}
        size="xRegularFill"
        color={theme.color.darkGray}
      />
      <Link
        to={`/mypage/modify/${item.id}`}
        state={{ map_name: item.map_name, map_emoji: item.map_emoji }}
      >
        <Icon size="small" url={Icons.Edit} alt="Edit Icon" />
      </Link>
    </S.ItemHeader>
    <S.ItemFooter>
      <Text
        text={`${item.places_count}개의장소`}
        size="xSmall"
        color={theme.color.gray}
      />
    </S.ItemFooter>
  </S.Item>
);
export default Item;
