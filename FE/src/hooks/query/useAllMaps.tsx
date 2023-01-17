import { useQuery } from '@tanstack/react-query';

import { getPublicMaps } from '@/apis/home';
import { getGroupMaps } from '@/apis/mypage';
import { SUCCESS_MAPS_DATA, SUCCESS_MAPS_GROUP_DATA } from '@/constants/code';
import { MapType } from '@/interfaces/Map';

const useAllMaps = (
  searchType: string,
  setSerachValue: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  allMapsData: MapType[],
  setAllMapsData: React.Dispatch<React.SetStateAction<MapType[]>>,
  setLastMapId: React.Dispatch<React.SetStateAction<number>>,
  lastMapId = 0
) => {
  const {
    data: mapsData,
    isLoading,
    refetch,
  } = useQuery(
    ['allMaps'],
    () =>
      searchType === 'public'
        ? getPublicMaps(name, lastMapId)
        : getGroupMaps(name),
    {
      onSuccess: ({ code, data: successData }: { data: any; code: string }) => {
        if (code === SUCCESS_MAPS_DATA) {
          if (successData && successData.content) {
            // 내가 포함된지도도 lastMapId로 스크롤 기능이 가능할때 다시 수정.
            // const newData = allMapsData.concat(successData.content);
            // setAllMapsData(newData);
            // const lastData =
            //   successData.content[successData.content.length - 1];
            // if (lastData) {
            //   setLastMapId(lastData.id);
            // }
            setSerachValue('');
            setAllMapsData(successData.content);
          }
        } else if (code === SUCCESS_MAPS_GROUP_DATA) {
          setAllMapsData(successData.content);
        }
      },
    }
  );

  return { mapsData, isLoading, refetch };
};

export default useAllMaps;
