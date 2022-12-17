import { useState } from 'react';

import * as S from '../PlaceModalReview/ModalContent.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

const PlaceModalUpdate = ({
  placeInfo,
  categoryInfo,
}: {
  placeInfo: PlaceDetail;
  categoryInfo: CategoryType[];
}) => {
  const [updateForm, setUpdateForm] = useState({
    id: 0,
    story: placeInfo.story,
    categoryId: 0,
  });

  const handlleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateForm({ ...updateForm, story: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleColorClick = (categoryId: number) => {
    setUpdateForm({ ...updateForm, categoryId });
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <header className="flex flex-col items-center gap-4">
        <S.Title>{placeInfo.name}</S.Title>
        <S.Address>{placeInfo.address}</S.Address>
      </header>
      <form className="h-full flex flex-col justify-between items-center">
        <textarea
          placeholder="당신의 이야기를 들려주세요."
          className="h-32 resize-none bg-silver rounded-2xl p-4"
          value={updateForm.story}
          onChange={handlleStoryChange}
        >
          {placeInfo.story}
        </textarea>
        <div className="flex flex-col items-center gap-4 mt-8">
          <h2 className="text-gray">선택할 수 있는 카테고리들</h2>
          <div className="w-96 flex flex-wrap px-8">
            {categoryInfo.map(color => (
              <div
                key={`category-${color.category_id}`}
                className="flex flex-col flex-wrap items-center gap-2 px-4"
              >
                <button
                  type="button"
                  aria-label="color"
                  className="w-8 h-8 rounded-full bg-gray hover:opacity-80"
                  onClick={() => handleColorClick(color.category_id)}
                />
                <span className="text-xs text-gray">{color.category_name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            size="xRegular"
            color={theme.color.black}
            onClick={(e: React.SyntheticEvent<HTMLFormElement>) =>
              handleSubmit(e)
            }
          >
            <Text text="장소 수정" size="regular" color={theme.color.white} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlaceModalUpdate;
