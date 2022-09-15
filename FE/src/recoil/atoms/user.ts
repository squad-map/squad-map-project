import { atom } from 'recoil';

import { IUser } from '@/interfaces/IUser';

export const userState = atom<IUser | null>({
  key: 'userState',
  default: null,
});
