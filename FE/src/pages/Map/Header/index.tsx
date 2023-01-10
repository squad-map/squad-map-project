import { useNavigate } from 'react-router-dom';

import * as S from './Header.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

export interface HeaderProps {
  headerData: {
    emoji: string;
    title: string;
    category_info: CategoryType[];
  };
}

const Header = ({ headerData }: HeaderProps) => {
  const navigte = useNavigate();

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
      </S.MapHeader>
    )
  );
};
export default Header;
