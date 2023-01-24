import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import PlaceInfos from '../PlaceInfos';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import RecentSearch from '@/components/RecentSearch';
import { searchplaceState } from '@/recoil/atoms/searchplace';
import theme from '@/styles/theme';
import { PlaceType } from '@/types/map';

interface SearchPlaceProps {
  searchAddressToCoordinate: (address: string) => void;
  placeInfos: PlaceType[];
  setCurrentCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const SearchPlace = ({
  searchAddressToCoordinate,
  placeInfos,
  setCurrentCoords,
}: SearchPlaceProps) => {
  const [searchValue, setSerachValue] = useState('');
  const [onPlaceInfos, setOnPlaceInfos] = useState(false);
  const [onRecentSearch, setOnRecentSearch] = useState(false);

  const searchData = useRecoilValue(searchplaceState);
  const setSearchPlace = useSetRecoilState(searchplaceState);

  const handleChangeSearchInput = ({
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

  const handleKeyUpSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;

    if (key === 'Enter' && target instanceof HTMLInputElement) {
      setSerachValue(target.value);
      (document.activeElement as HTMLElement).blur();
      handleSubmit();
    }
  };

  return (
    <div className="absolute top-8 right-20 z-[999]">
      <input
        type="text"
        className="w-[30rem] h-[3.4375rem] rounded-2xl px-10 mr-4 text-gray"
        placeholder="What kind of place are you looking for?"
        color={theme.color.white}
        value={searchValue}
        onChange={handleChangeSearchInput}
        onFocus={handleFocus}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyUpSearchInput(e)
        }
      />
      <Button size="xSmall" color={theme.color.navy} onClick={handleSubmit}>
        <Text text="검색" size="small" color={theme.color.white} />
      </Button>
      {onPlaceInfos && (
        <PlaceInfos
          placeInfos={placeInfos}
          setCurrentCoords={setCurrentCoords}
        />
      )}
      {onRecentSearch && (
        <RecentSearch
          setOnRecentSearch={setOnRecentSearch}
          setSerachValue={setSerachValue}
        />
      )}
    </div>
  );
};

export default SearchPlace;
