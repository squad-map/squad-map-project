import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import Item from './Item';
import * as S from './MyPage.style';

import { getMypage } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';

const MyPage = () => {
  const { data: myPageData } = useQuery(['myMaps'], getMypage);

  return (
    <>
      <Header />
      <S.TitleBox>
        <Icon size="medium" url={Icons.Map} alt="Map Icon" />
        <Text text="지도 관리" size="xLargeFill" color={theme.color.navy} />
      </S.TitleBox>
      <S.Contents>
        {myPageData && myPageData.content.length > 0 ? (
          <S.GridWrapper>
            <GridCards size="large">
              {myPageData.content.map((item: IMyMap) => (
                <Link to={`/map/${item.id}`} key={item.id}>
                  <Card size="large">
                    <Item item={item} />
                  </Card>
                </Link>
              ))}
            </GridCards>
          </S.GridWrapper>
        ) : (
          <S.EmptyContent>
            지도 데이터가 존재하지 않습니다. <br /> 나만의 지도를 추가해주세요.
          </S.EmptyContent>
        )}
        <Link to="/mypage/create">
          <Button
            size="large"
            color={theme.color.navy}
            background={`url(${Icons.Plus}) no-repeat right 1rem`}
          >
            <Text
              size="regular"
              text="나만의 지도 만들기"
              color={theme.color.white}
            />
          </Button>
        </Link>
      </S.Contents>
    </>
  );
};

export default MyPage;
