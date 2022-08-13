import { atom } from 'recoil';

export const searchState = atom({
  key: 'searchState',
  default: ['맛집', '카페', '빵집'],
});
