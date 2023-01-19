import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getMapCategories } from '@/apis/category';
import CreateCategoryModalInfo from '@/components/Category/CreateCategoryModalInfo';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import { SUCCESS_GET_CATEGORIES } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';
import { MapHeaderType } from '@/types/map';

interface CategoriesProps {
  headerData: MapHeaderType;
  handleCategoryClick: (color: string) => void;
}

const Categories = ({ headerData, handleCategoryClick }: CategoriesProps) => {
  const mapId = useGetMapId();
  const [isCategoryModal, setIsCategoryModal] = useState(false);

  const { data: mapCategories, isLoading: headerLoading } = useQuery(
    ['MapCategories', mapId],
    () => getMapCategories(mapId)
  );

  if (!headerLoading && mapCategories.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (headerLoading) {
    return <LoadingSpinner size="medium" />;
  }

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
