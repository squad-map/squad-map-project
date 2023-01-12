import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMapCategories } from '@/apis/category';
import { Icons } from '@/assets/icons';
import CategoryModalInfo from '@/components/Category/CategoryModalInfo';
import ModifyCategoryModalInfo from '@/components/Category/ModifyCategoryModalInfo';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import { SUCCESS_GET_CATEGORIES } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import theme from '@/styles/theme';
import { CategoryType, MapHeaderType } from '@/types/map';

interface HeaderProps {
  headerData: MapHeaderType;
  refetchMap?: () => void;
}

const Header = ({ headerData, refetchMap }: HeaderProps) => {
  const mapId = useGetMapId();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isModifyCategoryModal, setIsModifyCategoryModal] = useState(false);
  const [clickedCategory, setClickedCategory] = useState({
    category_id: 0,
    category_name: '',
    category_color: '',
  });
  const navigte = useNavigate();

  const handleCategoryClick = (category: CategoryType) => {
    setClickedCategory(category);
    setIsModifyCategoryModal(true);
  };

  const {
    data: mapCategories,
    isLoading: headerLoading,
    refetch: refetchMapCategories,
  } = useQuery(['MapCategory', mapId], () => getMapCategories(mapId));

  if (!headerLoading && mapCategories.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (headerLoading) {
    return <LoadingSpinner size="medium" />;
  }

  return (
    headerData && (
      <>
        <header className="h-16 flex items-center gap-4 absolute top-8 z-[999]">
          <button
            type="button"
            className="h-16 flex items-center gap-4 p-4 bg-navy rounded-r-2xl cursor-pointer"
            onClick={() => navigte(-1)}
          >
            <Icon
              size="large"
              url={Icons.ArrowBack}
              alt="뒤로가기 버튼 이미지"
            />
            <Text
              size="xLarge"
              text={`${headerData.emoji} ${headerData.title}`}
              color={theme.color.white}
            />
          </button>
          <Button
            size="regular"
            color={theme.color.black}
            key="category-create-button"
            onClick={() => setIsCategoryModal(true)}
            className="cursor-pointer"
          >
            <Text
              size="regular"
              text="카테고리 추가"
              color={theme.color.white}
            />
          </Button>
          {headerData.category_info &&
            headerData.category_info.map((category: CategoryType) => (
              <Button
                size="regular"
                color={theme.color.white}
                key={category.category_id}
                onClick={() => handleCategoryClick(category)}
              >
                <Text
                  size="regular"
                  text={category.category_name}
                  color={category.category_color}
                />
              </Button>
            ))}
        </header>
        {mapCategories && isCategoryModal && (
          <GlobalModal
            size="medium"
            handleCancelClick={() => setIsCategoryModal(false)}
          >
            <CategoryModalInfo
              headerData={headerData}
              mapCategories={mapCategories.data}
              setIsCategoryModal={setIsCategoryModal}
              refetchMapCategories={refetchMapCategories}
            />
          </GlobalModal>
        )}
        {mapCategories && isModifyCategoryModal && (
          <GlobalModal
            size="small"
            handleCancelClick={() => setIsModifyCategoryModal(false)}
          >
            <ModifyCategoryModalInfo
              mapCategories={mapCategories.data}
              clickedCategory={clickedCategory}
              setIsCategoryModal={setIsCategoryModal}
              refetchMap={refetchMap}
              refetchMapCategories={refetchMapCategories}
            />
          </GlobalModal>
        )}
      </>
    )
  );
};
export default Header;
