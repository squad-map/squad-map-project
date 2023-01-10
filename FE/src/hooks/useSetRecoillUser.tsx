import { useSetRecoilState } from 'recoil';

import { User } from '@/interfaces/User';
import { userState } from '@/recoil/atoms/user';

const useSetRecoilUser = (user: User | null) => {
  const setUser = useSetRecoilState(userState);
  if (user) {
    setUser(user);
  } else {
    setUser(null);
  }
};

export default useSetRecoilUser;
