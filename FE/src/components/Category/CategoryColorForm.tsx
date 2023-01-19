import { useMutation, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { putCategory } from '@/apis/category';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_PUT_CATEGORY } from '@/constants/code';
import { CategoryColors } from '@/constants/colors';
import { useGetMapId } from '@/hooks/useGetMapId';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';
import { checkDuplicateColor, isExistBgColor } from '@/utils/util';

interface CategoryColorFormProps {
  categories: CategoryType[];
  categoryForm: CategoryType;
  setCategoryForm: React.Dispatch<
    React.SetStateAction<{
      category_id: number;
      category_name: string;
      category_color: string;
    }>
  >;
  refetchCategories: () => void;
  handleCancelClick: () => void;
}

const CategoryColorForm = ({
  categories,
  categoryForm,
  setCategoryForm,
  refetchCategories,
  handleCancelClick,
}: CategoryColorFormProps) => {
  const queryClient = new QueryClient();
  const mapId = useGetMapId();
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchPutCategory = useMutation(putCategory, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_PUT_CATEGORY) {
        setModalText({
          title: '카테고리가 수정되었습니다.',
          description: '카테고리 수정 완료',
          buttonText: '확인',
          handleButtonClick: () => {
            queryClient.invalidateQueries(['MapCategory', mapId]);
            setIsModal(false);
            refetchCategories();
            handleCancelClick();
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

  const handleUpdateCategory = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCategory = {
      category_name: categoryForm.category_name,
      category_color: categoryForm.category_color,
    };

    fetchPutCategory.mutate({
      mapId,
      patchId: categoryForm.category_id,
      categoryPutParams: newCategory,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({ ...categoryForm, category_name: e.target.value });
  };

  return (
    <>
      <div className="w-60 flex flex-col gap-4 items-center py-6">
        <h2 className="text-xl">카테고리 수정</h2>
        <div className="w-60 flex flex-col gap-4 mb-2">
          <span className="text-lightGray">카테고리명</span>
          <Input
            id="name"
            width="15rem"
            height="2.5rem"
            placeholderText="카테고리 이름"
            background={theme.color.inputBackground}
            type="text"
            value={categoryForm.category_name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CategoryColors.map((color: string) => (
            <button
              key={`category-${color}`}
              type="button"
              aria-label="color-button"
              style={{
                backgroundColor: color,
              }}
              className={`w-6 h-6 rounded-full hover:opactiy-80 cursor-pointer ${
                isExistBgColor(categories, color) ? 'opacity-10' : 'opacity-100'
              }`}
              onClick={() =>
                setCategoryForm({ ...categoryForm, category_color: color })
              }
              disabled={checkDuplicateColor(categories, color)}
            />
          ))}
        </div>
        <span className="text-lightGray mb-2">
          현재 선택된 카테고리 : {categoryForm.category_color || '미선택'}
        </span>
        <div className="flex gap-4">
          <Button
            type="button"
            size="xSmall"
            color={theme.color.darkNavy}
            onClick={handleUpdateCategory}
          >
            <Text text="수정" size="xSmall" color={theme.color.white} />
          </Button>
          <Button
            type="button"
            size="xSmall"
            color={theme.color.navy}
            onClick={handleCancelClick}
          >
            <Text text="닫기" size="small" color={theme.color.white} />
          </Button>
        </div>
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

export default CategoryColorForm;
