import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import * as S from './Home.style';
import Item from './Item';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Input from '@/components/Input';
import { IMap } from '@/interfaces/IMap';
import theme from '@/styles/theme';

const getMapsData = async (searchValue: string, type: string) => {
  const response = await fetch(`/maps?type=${type}&searchValue=${searchValue}`);
  const maps = await response.json();
  return maps;
};

export default function HomePage() {
  const [searchValue, setSerachValue] = useState('');
  const [searchType, setSearchType] = useState('all');

  const {
    data: mapsData,
    isLoading: loading,
    refetch: refetchMaps,
  } = useQuery(['allMaps'], () => getMapsData(searchValue, searchType));

  const handleSearchInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      refetchMaps();
    }
  };

  const handleClickType = (type: string) => {
    setSearchType(type);
    refetchMaps();
  };

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
            value={searchValue}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
          />
        </S.SearchInputWrapper>
        <S.NavWrapper>
          <Button
            size="small"
            color={searchType === 'all' ? theme.color.navy : theme.color.white}
            onClick={() => handleClickType('all')}
          >
            <Text
              size="small"
              text="전체 공개 지도"
              color={
                searchType === 'all' ? theme.color.white : theme.color.navy
              }
            />
          </Button>
          <Button
            size="small"
            color={
              searchType === 'private' ? theme.color.navy : theme.color.white
            }
            onClick={() => handleClickType('private')}
          >
            <Text
              size="small"
              text="내가 포함된 지도"
              color={
                searchType === 'private' ? theme.color.white : theme.color.navy
              }
            />
          </Button>
        </S.NavWrapper>
        {loading ? (
          <LoadingSpinner size="xLarge" />
        ) : (
          <S.GridWrapper>
            <GridCards size="small">
              {mapsData.map((item: IMap) => (
                <Link to={`/maps/${item.id}`} key={`map-${item.id}`}>
                  <Card size="small" key={`HomeCard-${item.id}`}>
                    <Item item={item} key={`Card-${item.id}`} />
                  </Card>
                </Link>
              ))}
            </GridCards>
          </S.GridWrapper>
        )}
      </S.Contents>
    </S.Container>
  );
}
