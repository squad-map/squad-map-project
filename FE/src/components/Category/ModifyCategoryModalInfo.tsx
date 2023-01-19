import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import CategoryColorForm from './CategoryColorForm';

import { getMapCategories } from '@/apis/category';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import { useGetMapId } from '@/hooks/useGetMapId';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';

interface ModifyCategoryModalInfoProps {
  handleCancelClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyCategoryModalInfo = ({
  handleCancelClick,
}: ModifyCategoryModalInfoProps) => {
  const mapId = useGetMapId();
  const [categoryForm, setCategoryForm] = useState({
    category_id: 0,
    category_name: '',
    category_color: '',
  });

  const [isColorModal, setIsColorModal] = useState(false);

  const { data: mapCategories, refetch: refetchCategories } = useQuery(
    ['MapCategories', mapId],
    () => getMapCategories(mapId)
  );

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
            refetchCategories={refetchCategories}
            handleCancelClick={() => setIsColorModal(false)}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default ModifyCategoryModalInfo;
