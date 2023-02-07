import { useRecoilValue, useResetRecoilState } from 'recoil';

import RecentSearchView from './RecentSearchView';

import { searchplaceState } from '@/recoil/atoms/searchplace';

interface RecentSearchProps {
  setOnRecentSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSerachValue: React.Dispatch<React.SetStateAction<string>>;
}

const RecentSearch = ({
  setOnRecentSearch,
  setSerachValue,
}: RecentSearchProps) => {
  const searchData = useRecoilValue(searchplaceState);

  const resetSearchPlace = useResetRecoilState(searchplaceState);

  const handeItemClick = (value: string) => {
    setSerachValue(value);
    setOnRecentSearch(false);
  };

  return (
    <RecentSearchView
      searchData={searchData}
      resetSearchPlace={resetSearchPlace}
      handeItemClick={handeItemClick}
      handleCloseView={() => setOnRecentSearch(false)}
    />
  );
};

export default RecentSearch;
