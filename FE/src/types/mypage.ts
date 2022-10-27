import { IMyMap } from '@/interfaces/IMyMap';

export type MypagePostParams =
  | Pick<IMyMap, 'id' | 'map_name' | 'map_emoji'>
  | 'full_disclosure';
