import { useQuery } from '@tanstack/react-query';

import { getGroupMaps } from '@/apis/mypage';

const useGroupMaps = (name = '') => {
  const { data, isLoading, refetch } = useQuery(['gruopMaps'], () =>
    getGroupMaps(name)
  );

  return { data, isLoading, refetch };
};

export default useGroupMaps;
