import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import CategoryColorForm from './CategoryColorForm';

import { deleteCategory, getMapCategories } from '@/apis/category';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  FAIL_DELETE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
} from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';

interface ModifyCategoryModalInfoProps {
  handleCancelClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyCategoryModalInfo = ({
  handleCancelClick,
}: ModifyCategoryModalInfoProps) => {
  const queryClient = new QueryClient();
  const mapId = useGetMapId();
  const [categoryForm, setCategoryForm] = useState({
    category_id: 0,
    category_name: '',
    category_color: '',
  });

  const [isModal, setIsModal] = useState(false);
  const [isColorModal, setIsColorModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const { data: mapCategories } = useQuery(['MapCategories', mapId], () =>
    getMapCategories(mapId)
  );

  const fetchDeleteCategory = useMutation(deleteCategory, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_DELETE_CATEGORY) {
        setModalText({
          title: '카테고리가 삭제되었습니다.',
          description: '카테고리 삭제 완료',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            queryClient.invalidateQueries(['MapCategory', mapId]);
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
            handleCancelClick(false);
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

  const handleDeleteCategory = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    categoryId: number
  ) => {
    e.preventDefault();

    fetchDeleteCategory.mutate({
      mapId,
      deleteId: categoryId,
    });
  };

  const handleModifyClick = (category: CategoryType) => {
    setCategoryForm(category);
    setIsColorModal(true);
  };

  return (
    <>
      <section className="h-full flex flex-col justify-between items-center gap-4 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-navy mb-2">카테고리 관리</h1>
          <p className="text-gray mb-2">색상을 클릭해서 변경할 수 있습니다.</p>
          <p className="flex items-center text-xs text-gray">
            장소에서 사용되어 지는 카테고리는 삭제할 수 없습니다.
          </p>
        </div>
        {mapCategories.data.map((category: CategoryType) => (
          <div className="flex items-center gap-4">
            <div className="flex">
              <span className="text-gray w-28">{category.category_name}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                key={`category-${category.category_id}`}
                type="button"
                aria-label="color-button"
                style={{
                  backgroundColor: category.category_color,
                }}
                className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
              />
            </div>
            <Button
              type="button"
              size="xSmall"
              color={theme.color.darkNavy}
              onClick={() => handleModifyClick(category)}
            >
              <Text text="색상변경" size="xSmall" color={theme.color.white} />
            </Button>
            <Button
              type="button"
              size="xSmall"
              color={theme.color.red}
              onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
                handleDeleteCategory(e, category.category_id)
              }
            >
              <Text text="삭제" size="xSmall" color={theme.color.white} />
            </Button>
          </div>
        ))}
        <div>
          <Button
            type="button"
            size="xSmall"
            color={theme.color.navy}
            onClick={handleCancelClick}
          >
            <Text text="닫기" size="small" color={theme.color.white} />
          </Button>
        </div>
      </section>
      {isColorModal && mapCategories && (
        <GlobalModal
          size="xSmall"
          handleCancelClick={() => setIsColorModal(false)}
        >
          <CategoryColorForm
            categories={mapCategories.data}
            categoryForm={categoryForm}
            setCategoryForm={setCategoryForm}
            handleCancelClick={() => setIsColorModal(false)}
          />
        </GlobalModal>
      )}
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
