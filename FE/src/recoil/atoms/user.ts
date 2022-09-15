import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IUser } from '@/interfaces/IUser';

const { persistAtom } = recoilPersist();

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
