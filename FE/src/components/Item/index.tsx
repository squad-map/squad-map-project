import Text from '@/components/common/Text';
import { MapType } from '@/interfaces/Map';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

interface ItemProps {
  item: MapType;
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
    <div className="flex items-center gap-2">
      <img
        className="w-8 h-8 rounded-full"
        src={item.host_profile_image}
        alt="프로필이미지"
      />
      <span className="text-xs text-gray">작성자: {item.host_nickname}</span>
    </div>
  </div>
);

export default Item;
