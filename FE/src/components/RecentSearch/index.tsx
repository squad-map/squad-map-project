import { useRecoilValue } from 'recoil';

import * as S from './RecentSearch.style';

import Text from '@/components/common/Text';
import { searchState } from '@/recoil/atoms/search';
import theme from '@/styles/theme';

const RecentSearch = () => {
  const searchData = useRecoilValue(searchState);

  return (
    <S.RecentSearch>
      <S.RecentSearchWrapper>
        <Text text="최근검색어" size="xRegularFill" color={theme.color.black} />
        <S.Divider />
        <S.Content>
          {searchData &&
            searchData.map(value => (
              <Text
                key={value}
                text={value}
                size="regular"
                color={theme.color.lightGray}
                cursor
                hover
              />
            ))}
        </S.Content>
      </S.RecentSearchWrapper>
      <S.Bottom>
        <Text
          text="전체삭제"
          size="regular"
          color={theme.color.lightBlack}
          cursor
          hover
        />
        <Text
          text="최근검색어 끄기"
          size="regular"
          color={theme.color.lightBlack}
          cursor
          hover
        />
      </S.Bottom>
    </S.RecentSearch>
  );
};

export default RecentSearch;
