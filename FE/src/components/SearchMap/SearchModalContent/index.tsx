import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getMapCategories } from '@/apis/category';
import { postPlace } from '@/apis/place';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import { SUCCESS_GET_CATEGORIES, SUCCESS_POST_PLACE } from '@/constants/code';
import theme from '@/styles/theme';
import { CategoryType, PlaceType } from '@/types/map';

interface SearchModalContentprops {
  placeInfo: PlaceType;
}

const SearchModalContent = ({ placeInfo }: SearchModalContentprops) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeForm, setPlaceForm] = useState({
    story: '',
    category_id: 0,
    color: '',
  });

  const { data: mapCategory } = useQuery(['MapCategory'], () => {
    if (id) {
      return getMapCategories(+id);
    }
    return true;
  });

  const fetchPostPlace = useMutation(postPlace, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_POST_PLACE) {
        navigate(`/map/${id}`);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlaceForm({ ...placeForm, story: e.target.value });
  };

  const handleColorClick = (category_id: number, color: string) => {
    setPlaceForm({ ...placeForm, category_id, color });
  };

  const handleCreatePlace = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newPlace = {
      name: placeInfo.place_name,
      address: placeInfo.address,
      latitude: placeInfo.latitude,
      longitude: placeInfo.longitude,
      story: placeForm.story,
      detail_link: placeInfo.detail_link,
      category_id: placeForm.category_id,
    };

    fetchPostPlace.mutate({ map_id: id, placeRequestBody: newPlace });
  };

  if (mapCategory && mapCategory.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  return (
    <section className="h-full flex flex-col gap-4 items-center p-8">
      <h1 className="text-2xl">{placeInfo.place_name}</h1>
      <KakaoStaticMap placeInfo={placeInfo} />
      <form className="flex flex-col gap-2">
        <textarea
          placeholder="당신의 이야기를 들려주세요."
          value={placeForm.story}
          className="w-full h-52 p-4 resize-none rounded-2xl bg-inputBackground"
          onChange={handleStoryChange}
        />
        <div className="flex flex-col gap-4 mb-2">
          <span className="text-lightGray">카테고리 색상</span>
          <div className="flex flex-wrap">
            {mapCategory &&
              mapCategory.data.map((category: CategoryType) => (
                <button
                  type="button"
                  aria-label="color-button"
                  style={{
                    backgroundColor: category.category_color,
                  }}
                  className="w-8 h-8 rounded-full hover:opactiy-80"
                  onClick={() =>
                    handleColorClick(
                      category.category_id,
                      category.category_color
                    )
                  }
                />
              ))}
            {mapCategory && mapCategory.data.length === 0 && (
              <p className="text-xs">등록된 카테고리가 없습니다.</p>
            )}
          </div>
          <span className="text-lightGray">
            현재 선택된 카테고리 : {placeForm.color || '미선택'}
          </span>
        </div>
        <Button
          type="submit"
          size="xLarge"
          color={theme.color.darkNavy}
          onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
            handleCreatePlace(e)
          }
        >
          <Text text="장소 생성" size="regular" color={theme.color.white} />
        </Button>
      </form>
    </section>
  );
};

export default SearchModalContent;
