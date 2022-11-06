import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from './Home.style';
import Item from './Item';

import { getMaps } from '@/apis/home';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Input from '@/components/Input';
import useDebounce from '@/hooks/useDebounce';
import { IMap } from '@/interfaces/IMap';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

// const getMapsData = async (searchValue: string, type: string) => {
//   const response = await fetch(`/maps?type=${type}&searchValue=${searchValue}`);
//   const maps = await response.json();
//   return maps;
// };

export default function HomePage() {
  const [searchValue, setSerachValue] = useState('');
  // const debouncedValue = useDebounce(searchValue, 500);
  const [searchType, setSearchType] = useState('public');
  const user = useRecoilValue(userState);

  const {
    data: mapsData,
    isLoading: loading,
    refetch: refetchMaps,
  } = useQuery(['allMaps'], () => getMaps(searchType, 1, 10));

  const handleSearchInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(target.value);
  };

  const handleClickType = (type: string) => {
    setSearchType(type);
  };

  useEffect(() => {
    refetchMaps();
  }, [refetchMaps, searchType]);

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
          />
        </S.SearchInputWrapper>
        <S.NavWrapper>
          <Button
            size="small"
            color={
              searchType === 'public' ? theme.color.navy : theme.color.white
            }
            onClick={() => handleClickType('public')}
          >
            <Text
              size="small"
              text="전체 공개 지도"
              color={
                searchType === 'public' ? theme.color.white : theme.color.navy
              }
            />
          </Button>
          {user?.nickname && (
            <Button
              size="small"
              color={
                searchType === 'group' ? theme.color.navy : theme.color.white
              }
              onClick={() => handleClickType('group')}
            >
              <Text
                size="small"
                text="내가 포함된 지도"
                color={
                  searchType === 'group' ? theme.color.white : theme.color.navy
                }
              />
            </Button>
          )}
        </S.NavWrapper>
        {loading ? (
          <LoadingSpinner size="xLarge" />
        ) : (
          <S.GridWrapper>
            <GridCards size="small">
              {mapsData.content.map((item: IMap) => (
                <Link to={`/map/${item.id}`} key={`map-${item.id}`}>
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
