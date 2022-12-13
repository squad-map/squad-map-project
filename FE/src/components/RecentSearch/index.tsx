import { RecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import * as S from './RecentSearch.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

const RecentSearch = ({
  searchState,
}: {
  searchState: RecoilState<string[]>;
}) => {
  const searchData = useRecoilValue(searchState);
  const resetInit = useResetRecoilState(searchState);

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
            searchData.map((value: string) => (
              <Text
                key={value}
                text={value}
                size="regular"
                color={theme.color.lightGray}
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
            hover
          />
        </Button>
        <Text
          text="최근검색어 끄기"
          size="regular"
          color={theme.color.white}
          hover
        />
      </S.Bottom>
    </S.RecentSearch>
  );
};

export default RecentSearch;
