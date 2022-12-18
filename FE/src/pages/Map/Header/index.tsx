import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icons } from '@/assets/icons';
import CategoryModalInfo from '@/components/Category/CategoryModalInfo';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

export interface HeaderProps {
  map_id: number;
  emoji: string;
  title: string;
  category_info: CategoryType[];
}

const Header = ({ headerData }: { headerData: HeaderProps }) => {
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const navigte = useNavigate();

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
              >
                <Text
                  size="regular"
                  text={category.category_name}
                  color={category.category_color}
                />
              </Button>
            ))}
        </header>
        {isCategoryModal && (
          <GlobalModal
            size="medium"
            handleCancelClick={() => setIsCategoryModal(false)}
          >
            <CategoryModalInfo
              headerData={headerData}
              setIsCategoryModal={setIsCategoryModal}
            />
          </GlobalModal>
        )}
      </>
    )
  );
};
export default Header;
