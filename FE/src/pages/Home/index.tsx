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

const getMapsData = async () => {
  const response = await fetch('/');
  const maps = await response.json();
  return maps;
};

export default function HomePage() {
  const { data: mapsData, isLoading: loading } = useQuery(['allMaps'], () =>
    getMapsData()
  );
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
          />
        </S.SearchInputWrapper>
        <S.GridWrapper>
          <GridCards size="small">
            {loading ? (
              <LoadingSpinner size="xLarge" />
            ) : (
              mapsData.map((item: IMap) => (
                <Link to={`/map/${item.id}`} key={`map-${item.id}`}>
                  <Card size="small" key={`HomeCard-${item.id}`}>
                    <Item item={item} key={`Card-${item.id}`} />
                  </Card>
                </Link>
              ))
            )}
          </GridCards>
        </S.GridWrapper>
        <Link to="mypage">
          <S.ButtonWrapper>
            <Button
              size="large"
              color={theme.color.brown}
              background={`url(${Icons.Plus}) no-repeat right 1rem`}
            >
              <Text
                size="regular"
                text="나만의 지도 만들기"
                color={theme.color.white}
              />
            </Button>
          </S.ButtonWrapper>
        </Link>
      </S.Contents>
    </S.Container>
  );
}
