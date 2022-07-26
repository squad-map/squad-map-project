import { IMyMap } from '@/interfaces/IMyMap';

export type MypagePostParams =
  | Pick<IMyMap, 'id' | 'map_name' | 'map_emoji'>
  | 'full_disclosure';

export type MypagePatchParams = Pick<IMyMap, 'map_name' | 'map_emoji'>;
