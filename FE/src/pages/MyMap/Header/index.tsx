import { useNavigate } from 'react-router-dom';

import * as S from './Header.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';

interface HeaderProps {
  headerData: {
    emoji: string;
    title: string;
    categories: [{ name: string; color: string }];
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
            size="xLargeFill"
            text={`${headerData.emoji} ${headerData.title}`}
            color={theme.color.lightBlack}
          />
        </S.BackComponent>
        {headerData.categories &&
          headerData.categories.map((category: CategoryType) => (
            <Button size="regular" color={category.color}>
              <Text
                size="regular"
                text={category.name}
                color={theme.color.white}
              />
            </Button>
          ))}
      </S.MapHeader>
    )
  );
};
export default Header;
