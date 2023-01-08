import { atom } from 'recoil';

export const searchplaceState = atom({
  key: 'searchplaceState',
  default: [] as string[],
});
