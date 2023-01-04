import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { getMaps } from '@/apis/home';
import { getMypage } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Item from '@/components/Item';
// import useDebounce from '@/hooks/UseDebounce';
import { SUCCESS_MAPS_DATA, SUCCESS_MAPS_GROUP_DATA } from '@/constants/code';
import { MapType } from '@/interfaces/Map';
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
  } = useQuery(['allMaps'], () =>
    searchType === 'public' ? getMaps(0) : getMypage('')
  );

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

  if (
    mapsData &&
    mapsData.code !== SUCCESS_MAPS_DATA &&
    mapsData.code !== SUCCESS_MAPS_GROUP_DATA
  )
    return <div>API Error</div>;

  return (
    <section className="w-full h-full relative">
      <Header />
      <div className="flex flex-col items-center mb-16">
        <div className="text-center mb-16">
          <Input
            type="input"
            placeholderText="What kind of place are you looking for?"
            background={`${theme.color.white} url(${Icons.Search}) no-repeat 1rem`}
            value={searchValue}
            onChange={handleSearchInput}
          />
        </div>
        <nav className="flex gap-4 mb-8">
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
        </nav>
        {loading ? (
          <LoadingSpinner size="xLarge" />
        ) : (
          <div className="mb-16">
            <GridCards>
              {mapsData.data.content &&
                mapsData.data.content.map((item: MapType) => (
                  <Link to={`/map/${item.id}`} key={`map-${item.id}`}>
                    <Card size="small" key={`HomeCard-${item.id}`}>
                      <Item item={item} key={`Card-${item.id}`} />
                    </Card>
                  </Link>
                ))}
            </GridCards>
          </div>
        )}
      </div>
    </section>
  );
}
