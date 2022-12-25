import Text from '@/components/common/Text';
import { IMap } from '@/interfaces/IMap';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: IMap;
}

const Item = ({ item }: ItemProps) => (
  <div className="h-full flex flex-col justify-center items-center gap-4">
    <Text
      size="xLarge"
      text={`${unicodeToEmoji(item.map_emoji)}`}
      color={theme.color.white}
    />
    <h4 className="text-md text-gray">{item.map_name}</h4>
    <span className="text-sm text-gray">
      등록된 장소 : {item.places_count}개
    </span>
    <span className="text-xs text-gray">작성자: {item.host_nickname}</span>
  </div>
);

export default Item;
