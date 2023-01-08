import { useRecoilValue } from 'recoil';

import { userState } from '@/recoil/atoms/user';

export const useIsLoggedIn = () => {
  const user = useRecoilValue(userState);

  if (user && user.member_id) return true;

  return false;
};
