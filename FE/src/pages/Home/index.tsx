import * as S from './Home.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Input from '@/components/Input';
import theme from '@/styles/theme';

export default function HomePage() {
  return (
    <S.Container>
      <Header />
      <S.Contents>
        <S.SearchInputWrapper>
          <Input
            type="input"
            placeholderText="What kind of place are you looking for?"
            color={theme.color.white}
            background={`${theme.color.white} url(${Icons.Search}) no-repeat 1rem`}
          />
        </S.SearchInputWrapper>
        <S.GridWrapper>
          <GridCards />
        </S.GridWrapper>
        <S.ButtonWrapper>
          <Button
            size="large"
            color={theme.color.brown}
            background={`url(${Icons.Plus}) no-repeat right 1rem`}
          >
            <Text
              size="regular"
              text="나만의 지도 만들기"
              color={theme.color.white}
            />
          </Button>
        </S.ButtonWrapper>
      </S.Contents>
    </S.Container>
  );
}
