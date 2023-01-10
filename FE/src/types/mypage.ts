import { MyMapType } from '@/interfaces/MyMap';

export type MypagePostParams =
  | Pick<MyMapType, 'id' | 'map_name' | 'map_emoji'>
  | 'full_disclosure';

export type MypagePutParams = Pick<MyMapType, 'map_name' | 'map_emoji'>;
