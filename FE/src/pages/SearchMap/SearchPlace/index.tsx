import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import PlaceInfos from '../PlaceInfos';

import * as S from './SearchPlace.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import RecentSearch from '@/components/RecentSearch';
import { searchplaceState } from '@/recoil/atoms/searchplace';
import theme from '@/styles/theme';
import { PlaceType } from '@/types/map';

interface SearchPlaceProps {
  searchAddressToCoordinate: (address: string) => any;
  placeInfos: PlaceType[];
}

const SearchPlace = ({
  searchAddressToCoordinate,
  placeInfos,
}: SearchPlaceProps) => {
  const [searchValue, setSerachValue] = useState('');
  const [onPlaceInfos, setOnPlaceInfos] = useState(false);
  const [onRecentSearch, setOnRecentSearch] = useState(false);

  const searchData = useRecoilValue(searchplaceState);
  const setSearchPlace = useSetRecoilState(searchplaceState);

  const handleSearchInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(target.value);
  };

  const handleSubmit = () => {
    if (searchValue === '') return;

    searchAddressToCoordinate(searchValue);
    setOnPlaceInfos(true);
    setOnRecentSearch(false);

    if (!searchData.includes(searchValue)) {
      setSearchPlace(searchPlace => [...searchPlace, searchValue]);
    }
    setSerachValue('');
  };

  const handleFocus = () => {
    if (!onRecentSearch) {
      setOnRecentSearch(true);
    }
  };

  return (
    <S.SearchPlace>
      <S.SearchInput
        type="input"
        placeholder="What kind of place are you looking for?"
        color={theme.color.white}
        value={searchValue}
        onChange={handleSearchInput}
        onFocus={handleFocus}
      />
      <Button size="xSmall" color={theme.color.navy} onClick={handleSubmit}>
        <Text text="검색" size="small" color={theme.color.white} />
      </Button>
      {onPlaceInfos && <PlaceInfos placeInfos={placeInfos} />}
      {onRecentSearch && <RecentSearch />}
    </S.SearchPlace>
  );
};

export default SearchPlace;
