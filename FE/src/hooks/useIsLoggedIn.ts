import { useRecoilValue } from 'recoil';

import { userState } from '@/recoil/atoms/user';

export const useIsLoggedIn = () => {
  const user = useRecoilValue(userState);
  return !!user;
};
