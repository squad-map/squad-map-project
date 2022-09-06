import { IMyMap } from '@/interfaces/IMyMap';

export type MypagePostParams =
  | Pick<IMyMap, 'id' | 'emoji' | 'title'>
  | 'emails';
