import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryModalInfo from '../Category/CategoryModalInfo';

import * as S from './Header.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

export interface HeaderProps {
  headerData: {
    emoji: string;
    title: string;
    categories: [{ name: string; color: string }];
  };
}

const Header = ({ headerData }: HeaderProps) => {
  const navigte = useNavigate();
  const [isCategoryOpenModal, setIsCategoryOpenModal] = useState(false);
  return (
    headerData && (
      <S.MapHeader>
        <S.BackComponent onClick={() => navigte(-1)}>
          <Icon size="large" url={Icons.ArrowBack} alt="뒤로가기 버튼 이미지" />
          <Text
            size="xLarge"
            text={`${headerData.emoji} ${headerData.title}`}
            color={theme.color.white}
          />
        </S.BackComponent>
        <Button
          size="regular"
          color={theme.color.black}
          onClick={() => setIsCategoryOpenModal(true)}
        >
          <Text size="regular" text="카테고리 설정" color={theme.color.white} />
        </Button>
        {headerData.categories &&
          headerData.categories.map((category: CategoryType) => (
            <Button
              size="regular"
              color={theme.color.white}
              key={category.name}
            >
              <Text
                size="regular"
                text={category.name}
                color={category.color}
              />
            </Button>
          ))}
        {isCategoryOpenModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsCategoryOpenModal(false)}
          >
            <CategoryModalInfo headerData={headerData} />
          </GlobalModal>
        )}
      </S.MapHeader>
    )
  );
};
export default Header;
