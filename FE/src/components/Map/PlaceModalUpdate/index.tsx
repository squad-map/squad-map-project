import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { patchPlace } from '@/apis/place';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_PATCH_PLACE } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import useModal from '@/hooks/useModal';
import { queryClient } from '@/index';
import { CategoryType } from '@/interfaces/Category';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';

interface PlaceModalUpdateProps {
  placeInfo: PlaceDetail;
  categoryInfo: CategoryType[];
  setIsOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlaceModalUpdate = ({
  placeInfo,
  categoryInfo,
  setIsOpenUpdateModal,
}: PlaceModalUpdateProps) => {
  const selectedCategory = categoryInfo.find(
    (category: CategoryType) => category.category_id === placeInfo.category_id
  ) as CategoryType;

  const mapId = useGetMapId();
  const [updateForm, setUpdateForm] = useState({
    id: 0,
    story: placeInfo.story,
    category_id: selectedCategory.category_id,
    category_color: selectedCategory.category_color,
  });

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchPatchPlace = useMutation(patchPlace, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_PATCH_PLACE) {
        setModalText({
          title: '장소가 수정되었습니다.',
          description: '장소 수정 완료',
          buttonText: '확인',
          handleButtonClick: () => {
            queryClient.invalidateQueries(['Map', mapId]);
            setIsOpenUpdateModal(false);
            return true;
          },
        });
        setIsModal(true);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handlleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateForm({ ...updateForm, story: e.target.value });
  };

  const handleUpdatePlaceDetail = (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (updateForm.category_id === 0 || updateForm.story === '') {
      setModalText({
        title: '값을 채워주세요.',
        description: '빈 값 존재.',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
    }
    const newPlace = {
      category_id: updateForm.category_id,
      story: updateForm.story,
    };

    fetchPatchPlace.mutate({
      mapId,
      patchId: placeInfo.place_id,
      placePatchParams: newPlace,
    });
  };

  const handleColorClick = (category_id: number, category_color: string) => {
    setUpdateForm({ ...updateForm, category_id, category_color });
  };

  return (
    <>
      <div className="h-[36.25rem] flex flex-col gap-4 py-8">
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-lg">{placeInfo.place_name}</h1>
          <p className="text-md text-darkGray">{placeInfo.address}</p>
        </header>
        <form className="h-full flex flex-col justify-between items-center">
          <textarea
            placeholder="당신의 이야기를 들려주세요."
            className="h-32 resize-none bg-silver rounded-2xl p-4"
            value={updateForm.story}
            onChange={handlleStoryChange}
          />
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-gray">선택할 수 있는 카테고리들</h2>
            <div className="w-96 flex flex-wrap px-8">
              {categoryInfo.map(category => (
                <div
                  key={`category-${category.category_id}`}
                  className="flex flex-col flex-wrap items-center gap-2 px-4"
                >
                  <button
                    type="button"
                    aria-label="color"
                    style={{
                      backgroundColor: category.category_color,
                    }}
                    className="w-8 h-8 rounded-full  hover:opacity-80"
                    onClick={() =>
                      handleColorClick(
                        category.category_id,
                        category.category_color
                      )
                    }
                  />
                  <span className="text-xs text-gray">
                    {category.category_name}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-lightGray">
              현재 선택된 카테고리 : {updateForm.category_color || '미선택'}
            </span>
          </div>
          <div>
            <Button
              type="submit"
              size="xRegular"
              color={theme.color.black}
              onClick={(e: React.SyntheticEvent<HTMLFormElement>) =>
                handleUpdatePlaceDetail(e)
              }
            >
              <Text text="장소 수정" size="regular" color={theme.color.white} />
            </Button>
          </div>
        </form>
      </div>
      {isModal && (
        <GlobalModal size="xSmall" handleCancelClick={() => setIsModal(false)}>
          <ModalContent
            title={modalText.title}
            description={modalText.description}
            buttonText={modalText.buttonText}
            handleButtonClick={modalText.handleButtonClick}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default PlaceModalUpdate;
