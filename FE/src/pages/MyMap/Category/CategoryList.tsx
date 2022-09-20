import * as S from './CategoryList.style';

import Text from '@/components/common/Text';
import theme from '@/styles/theme';

const CategoryList = () => (
  <S.ListWrapper>
    <S.ListHeader>
      <Text text="3개의 카테고리" size="regular" color={theme.color.white} />
    </S.ListHeader>
  </S.ListWrapper>
);

export default CategoryList;
