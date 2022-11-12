import { atom } from 'recoil';

export const searchNameState = atom({
  key: 'searchNameState',
  default: [] as string[],
});
