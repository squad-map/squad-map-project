import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMapCategories } from '@/apis/category';
import { getMapDetailInfo } from '@/apis/mypage';
import { postPlace } from '@/apis/place';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/staticMap';
import { CategoryColors } from '@/constants/colors';
import theme from '@/styles/theme';
import { CategoryType, PlaceType } from '@/types/map';

const SearchModalContent = ({ placeInfo }: { placeInfo: PlaceType }) => {
  // TODO: API가 도착하면 테스트 필요
  const { id } = useParams();
  const [placeForm, setPlaceForm] = useState({
    story: '',
    category_id: 0,
    color: '',
  });

  const { data: mapData } = useQuery(
    ['Map'],
    () => {
      if (id) {
        getMapDetailInfo(id);
      }
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  const { data: mapCategory } = useQuery(['MapCategory'], () => {
    if (id) {
      return getMapCategories(+id);
    }
    return true;
  });

  const fetchPostPlace = useMutation(postPlace, {
    onSuccess: (data: { place_id: number }) => {
      if (data.place_id) {
        // 팝업닫기.
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handlleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlaceForm({ ...placeForm, story: e.target.value });
  };

  const handleColorClick = (color: string) => {
    setPlaceForm({ ...placeForm, color });
  };

  const checkDupliCateColor = (color: string) => {
    const existColors = mapCategory.map(
      (category: CategoryType) => category.category_color
    );

    if (existColors.includes(color)) return true;
    return false;
  };

  const handleCreatePlace = () => {
    const newPlace = {
      name: placeInfo.place_name,
      address: placeInfo.address,
      latitude: placeInfo.latitude,
      longitude: placeInfo.longitude,
      story: placeForm.story,
      detail_link: placeInfo.detail_link,
      map_id: id,
      category_id: placeForm.category_id,
    };

    fetchPostPlace.mutate(newPlace);
  };

  return (
    <section className="h-full flex flex-col gap-4 items-center p-8">
      <h1 className="text-2xl">{placeInfo.place_name}</h1>
      <KakaoStaticMap placeInfo={placeInfo} />
      <form className="flex flex-col gap-2">
        <textarea
          placeholder="당신의 이야기를 들려주세요."
          value={placeForm.story}
          className="w-96 h-48 p-4 resize-none rounded-2xl bg-inputBackground"
          onChange={handlleStoryChange}
        />
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-lightGray">카테고리 색상</span>
          <div className="flex flex-wrap gap-2">
            {CategoryColors.map((color: string) => (
              <button
                type="button"
                aria-label="color-button"
                style={{
                  backgroundColor: color,
                }}
                className="w-8 h-8 rounded-full  hover:opactiy-80"
                onClick={() => handleColorClick(color)}
                // disabled={checkDupliCateColor(color)}
              />
            ))}
          </div>
          <span className="text-lightGray">
            현재 선택된 카테고리 : {placeForm.color || '미선택'}
          </span>
        </div>
        <Button
          type="submit"
          size="xLarge"
          color={theme.color.darkNavy}
          onClick={handleCreatePlace}
        >
          <Text text="장소 생성" size="regular" color={theme.color.white} />
        </Button>
      </form>
    </section>
  );
};

export default SearchModalContent;
