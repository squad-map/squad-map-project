import { useState } from 'react';

import CreateCategoryModalInfo from '@/components/Category/CreateCategoryModalInfo';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import { SUCCESS_GET_CATEGORIES } from '@/constants/code';
import useGetMapCategories from '@/hooks/query/useGetMapCategories';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';
import { MapHeaderType } from '@/types/map';

interface CategoriesProps {
  headerData: MapHeaderType;
  handleCategoryClick: (color: string) => void;
}

const Categories = ({ headerData, handleCategoryClick }: CategoriesProps) => {
  const [isCategoryModal, setIsCategoryModal] = useState(false);

  const { mapCategories, mapCategoriesLoading } = useGetMapCategories();

  if (!mapCategoriesLoading && mapCategories.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  return (
    headerData && (
      <>
        {headerData.category_info &&
          headerData.category_info.map((category: CategoryType) => (
            <Button
              size="regular"
              color={theme.color.white}
              key={category.category_id}
              onClick={() => handleCategoryClick(category.category_color)}
            >
              <Text
                size="regular"
                text={category.category_name}
                color={category.category_color}
              />
            </Button>
          ))}

        {mapCategories && isCategoryModal && (
          <GlobalModal
            size="medium"
            handleCancelClick={() => setIsCategoryModal(false)}
          >
            <CreateCategoryModalInfo setIsCategoryModal={setIsCategoryModal} />
          </GlobalModal>
        )}
      </>
    )
  );
};
export default Categories;
