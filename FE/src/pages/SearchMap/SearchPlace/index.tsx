import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import PlaceInfos from '../PlaceInfos';

import * as S from './SearchPlace.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import RecentSearch from '@/components/RecentSearch';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import { searchplaceState } from '@/recoil/atoms/searchplace';
import theme from '@/styles/theme';

const SearchPlace = () => {
  const [placeInfos, setPlaceInfos] = useState<ISearchPlace[]>([]);
  const [onPlaceInfos, setOnPlaceInfos] = useState(false);
  const [searchValue, setSerachValue] = useState('');
  const [onRecentSearch, setOnRecentSearch] = useState(false);

  const setSearchPlace = useSetRecoilState(searchplaceState);

  const handleSearchInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(target.value);
  };

  const handleSubmit = () => {
    // naver api 요청
    const dummyDatas = [
      {
        id: 1,
        title: 'test',
        address: 'guro',
        description: 'des',
      },
      {
        id: 2,
        title: 'test3',
        address: 'guro3',
        description: 'des2',
      },
      {
        id: 3,
        title: 'sadfasf',
        address: 'hahahaha',
        description: 'des23333',
      },
      {
        id: 4,
        title: 'sadfasf',
        address: 'hahahaha',
        description: 'des23333',
      },
      {
        id: 5,
        title: 'sadfasf',
        address: 'hahahaha',
        description: 'des23333',
      },
      {
        id: 6,
        title: 'sadfasf',
        address: 'hahahaha',
        description: 'des23333',
      },
      {
        id: 7,
        title: 'sadfasf',
        address: 'hahahaha',
        description: 'des23333',
      },
    ];
    setPlaceInfos(dummyDatas);
    setOnPlaceInfos(true);
    setSearchPlace(searchPlace => [...searchPlace, searchValue]);
    setSerachValue('');
    setOnRecentSearch(false);
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
