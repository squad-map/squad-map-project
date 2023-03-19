import { useQuery } from '@tanstack/react-query';

import { useGetMapId } from '../useGetMapId';

import { getMapDetailInfo } from '@/apis/mypage';

const useGetMapDetailInfo = () => {
  const mapId = useGetMapId();
  const { data: mapData, isLoading: mapLoading } = useQuery(['Map'], () =>
    getMapDetailInfo(mapId)
  );

  return { mapData, mapLoading };
};

export default useGetMapDetailInfo;
