import { useRecoilValue, useResetRecoilState } from 'recoil';

import * as S from './RecentSearch.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { searchplaceState } from '@/recoil/atoms/searchplace';
import theme from '@/styles/theme';

const RecentSearch = () => {
  const searchData = useRecoilValue(searchplaceState);
  const resetInit = useResetRecoilState(searchplaceState);

  const handleSearchAllRemove = () => {
    resetInit();
  };

  return (
    <S.RecentSearch>
      <S.RecentSearchInner>
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
      </S.RecentSearchInner>
      <S.Bottom>
        <Button
          size="xSmall"
          color={theme.color.transparent}
          onClick={handleSearchAllRemove}
        >
          <Text
            text="전체삭제"
            size="regular"
            color={theme.color.white}
            cursor
            hover
          />
        </Button>
        <Text
          text="최근검색어 끄기"
          size="regular"
          color={theme.color.white}
          cursor
          hover
        />
      </S.Bottom>
    </S.RecentSearch>
  );
};

export default RecentSearch;
