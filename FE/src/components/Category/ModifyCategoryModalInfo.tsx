import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { deleteCategory, putCategory } from '@/apis/category';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  FAIL_DELETE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
  SUCCESS_PUT_CATEGORY,
} from '@/constants/code';
import { CategoryColors } from '@/constants/colors';
import { useGetMapId } from '@/hooks/useGetMapId';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';
import { checkDuplicateColor, isExistBgColor } from '@/utils/util';

interface ModifyCategoryModalInfoProps {
  mapCategories: CategoryType[];
  clickedCategory: CategoryType;
  setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchMap?: () => void;
  refetchMapCategories: () => void;
}

const ModifyCategoryModalInfo = ({
  mapCategories,
  clickedCategory,
  setIsCategoryModal,
  refetchMap,
  refetchMapCategories,
}: ModifyCategoryModalInfoProps) => {
  const mapId = useGetMapId();
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

  const fetchPutCategory = useMutation(putCategory, {
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
            if (refetchMap) refetchMap();
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

  const fetchDeleteCategory = useMutation(deleteCategory, {
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
      } else if (code === FAIL_DELETE_CATEGORY) {
        setModalText({
          title: '카테고리가 삭제 불가',
          description: '이미 사용중인 카테고리 입니다.',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            setIsCategoryModal(false);
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

  const handleDeleteCategory = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    fetchDeleteCategory.mutate({
      mapId,
      deleteId: categoryForm.category_id,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({ ...categoryForm, category_name: e.target.value });
  };

  return (
    <>
      <section className="h-full flex flex-col items-center p-16">
        <h1 className="text-2xl text-navy mb-8">카테고리 수정</h1>
        <form className="flex flex-col items-center">
          <div className="w-60 flex flex-col gap-4 mb-4">
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
          <span className="text-lightGray mb-2">
            현재 선택된 카테고리 : {categoryForm.category_color || '미선택'}
          </span>
          <p className="flex items-center text-xs text-gray mb-4">
            장소에서 사용되어 지는 카테고리는 삭제할 수 없습니다.
          </p>
          <div className="flex gap-4">
            <Button
              type="button"
              size="small"
              color={theme.color.darkNavy}
              onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
                handleUpdateCategory(e)
              }
            >
              <Text
                text="카테고리 수정"
                size="xSmall"
                color={theme.color.white}
              />
            </Button>
            <Button
              type="button"
              size="small"
              color={theme.color.red}
              onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
                handleDeleteCategory(e)
              }
            >
              <Text
                text="카테고리 삭제"
                size="xSmall"
                color={theme.color.white}
              />
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
