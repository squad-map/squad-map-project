import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { deleteCategory, patchCategory } from '@/apis/category';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  SUCCESS_DELETE_CATEGORY,
  SUCCESS_PUT_CATEGORY,
} from '@/constants/code';
import { CategoryColors } from '@/constants/colors';
import theme from '@/styles/theme';
import { CategoryRequestPatchBody, CategoryType } from '@/types/map';
import { checkDuplicateColor, isExistBgColor } from '@/utils/util';

interface ModifyCategoryModalInfoProps {
  mapCategories: CategoryType[];
  clickedCategory: CategoryType;
  setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchMapCategories: () => void;
}

const ModifyCategoryModalInfo = ({
  mapCategories,
  clickedCategory,
  setIsCategoryModal,
  refetchMapCategories,
}: ModifyCategoryModalInfoProps) => {
  const { id } = useParams();
  const [categoryForm, setCategoryForm] = useState({
    category_id: clickedCategory.category_id,
    category_name: clickedCategory.category_name,
    category_color: clickedCategory.category_color,
  });

  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchPatchCategory = useMutation(
    ({
      paramId,
      categoryRequestBody,
    }: {
      paramId: number;
      categoryRequestBody: CategoryRequestPatchBody;
    }) => {
      if (id)
        return patchCategory({
          mapId: +id,
          patchId: paramId,
          categoryRequestBody,
        });
      return true;
    },
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_PUT_CATEGORY) {
          setModalText({
            title: '카테고리가 수정되었습니다.',
            description: '카테고리 수정 완료',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              setIsCategoryModal(false);
              refetchMapCategories();
              return true;
            },
          });
          setIsModal(true);
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const fetchDeleteCategory = useMutation(
    (paramId: number) => {
      if (id) return deleteCategory({ mapId: +id, deleteId: paramId });
      return true;
    },
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_CATEGORY) {
          setModalText({
            title: '카테고리가 삭제되었습니다.',
            description: '카테고리 삭제 완료',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              setIsCategoryModal(false);
              refetchMapCategories();
              return true;
            },
          });
          setIsModal(true);
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const handleUpdateCategory = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCategory = {
      category_name: categoryForm.category_name,
      category_color: categoryForm.category_color,
    };

    if (id) {
      fetchPatchCategory.mutate({
        paramId: categoryForm.category_id,
        categoryRequestBody: newCategory,
      });
    }
  };

  const handleDeleteCategory = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchDeleteCategory.mutate(categoryForm.category_id);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({ ...categoryForm, category_name: e.target.value });
  };

  return (
    <>
      <section className="h-full flex flex-col items-center p-16">
        <h1 className="text-2xl text-navy mb-8">카테고리 수정</h1>
        <form className="flex flex-col items-center">
          <div className="w-60 flex flex-col gap-4 mb-8">
            <span className="text-lightGray">카테고리명</span>
            <Input
              id="name"
              width="15rem"
              height="2.5rem"
              placeholderText="카테고리 이름"
              color={theme.color.placeholder}
              background={theme.color.inputBackground}
              type="text"
              value={categoryForm.category_name}
              onChange={handleNameChange}
            />
          </div>
          <div className="w-60 flex flex-col gap-4 mb-4">
            <span className="text-lightGray">카테고리 색상</span>
            <div className="flex flex-wrap gap-2">
              {CategoryColors.map((color: string) => (
                <button
                  key={`category-${color}`}
                  type="button"
                  aria-label="color-button"
                  style={{
                    backgroundColor: color,
                  }}
                  className={`w-8 h-8 rounded-full hover:opactiy-80 ${
                    isExistBgColor(mapCategories, color)
                      ? 'opacity-10'
                      : 'opacity-100'
                  }`}
                  onClick={() =>
                    setCategoryForm({ ...categoryForm, category_color: color })
                  }
                  disabled={checkDuplicateColor(mapCategories, color)}
                />
              ))}
            </div>
          </div>
          <span className="text-lightGray mb-4">
            현재 선택된 카테고리 : {categoryForm.category_color || '미선택'}
          </span>
          <div className="flex gap-4">
            <Button
              type="button"
              size="small"
              color={theme.color.darkNavy}
              onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
                handleUpdateCategory(e)
              }
            >
              <Text text="장소 수정" size="xSmall" color={theme.color.white} />
            </Button>
            <Button
              type="button"
              size="small"
              color={theme.color.red}
              onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
                handleDeleteCategory(e)
              }
            >
              <Text text="장소 삭제" size="xSmall" color={theme.color.white} />
            </Button>
          </div>
        </form>
      </section>
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

export default ModifyCategoryModalInfo;
