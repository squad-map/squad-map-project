import { atom } from 'recoil';

export const searchplaceState = atom({
  key: 'searchplaceState',
  default: ['맛집', '카페', '빵집'] as string[],
});
