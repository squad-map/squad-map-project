import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Item from '@/components/Item';
import { SUCCESS_MAPS_DATA } from '@/constants/code';
import useAllMaps from '@/hooks/query/useAllMaps';
import useDebounce from '@/hooks/useDebounce';
import { MapType } from '@/interfaces/Map';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

export default function HomePage() {
  const [searchValue, setSerachValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const [searchType, setSearchType] = useState('public');
  const [lastMapId, setLastMapId] = useState(0);
  const [ref, inView] = useInView();
  const user = useRecoilValue(userState);
  const [allMapsData, setAllMapsData] = useState<MapType[]>([]);

  const { mapsData, isLoading, refetch } = useAllMaps(
    searchType,
    debouncedValue,
    allMapsData,
    setAllMapsData,
    setLastMapId,
    lastMapId
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
    setLastMapId(0);
    refetch();
  }, [refetch, debouncedValue, searchType]);

  useEffect(() => {
    if (mapsData && mapsData.data.has_next === false) return;

    if (inView) {
      refetch();
    }
  }, [inView, mapsData, refetch]);

  if (!isLoading && mapsData.code !== SUCCESS_MAPS_DATA)
    return <div>API Error</div>;

  if (isLoading) {
    return <LoadingSpinner size="xLarge" />;
  }

  return (
    <section className="w-full h-full relative">
      <Header />
      <div className="flex flex-col items-center mb-16">
        {searchType === 'group' && (
          <div className="text-center mb-16 animate-fadeInDown duration-100">
            <Input
              type="input"
              placeholderText="What kind of place are you looking for?"
              background={`${theme.color.white} url(${Icons.Search}) no-repeat 1rem`}
              value={searchValue}
              onChange={handleSearchInput}
            />
          </div>
        )}
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
        <div className="mb-16">
          <GridCards>
            {allMapsData ? (
              allMapsData.map((item: MapType, idx: number) => (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {idx === allMapsData.length - 1 ? (
                    <div ref={ref}>
                      <Link to={`/map/${item.id}`} key={`map-${item.id}`}>
                        <Card size="small" key={`HomeCard-${item.id}`}>
                          <Item item={item} key={`Card-${item.id}`} />
                        </Card>
                      </Link>
                    </div>
                  ) : (
                    <Link to={`/map/${item.id}`} key={`map-${item.id}`}>
                      <Card size="small" key={`HomeCard-${item.id}`}>
                        <Item item={item} key={`Card-${item.id}`} />
                      </Card>
                    </Link>
                  )}
                </>
              ))
            ) : (
              <div>No Data...</div>
            )}
          </GridCards>
        </div>
      </div>
    </section>
  );
}
