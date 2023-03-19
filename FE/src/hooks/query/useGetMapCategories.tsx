import { useQuery } from '@tanstack/react-query';

import { useGetMapId } from '../useGetMapId';

import { getMapCategories } from '@/apis/category';

const useGetMapCategories = () => {
  const mapId = useGetMapId();

  const {
    data: mapCategories,
    isLoading: mapCategoriesLoading,
    refetch: refetchMapCategories,
  } = useQuery(['MapCategories', mapId], () => getMapCategories(mapId));

  return { mapCategories, mapCategoriesLoading, refetchMapCategories };
};

export default useGetMapCategories;
