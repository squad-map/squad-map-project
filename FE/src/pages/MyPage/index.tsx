import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getGroupMaps } from '@/apis/mypage';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Icon from '@/components/common/Icon';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import Item from '@/components/MyPage/Item';
import { SUCCESS_MAPS_GROUP_DATA } from '@/constants/code';
import { MyMapType } from '@/interfaces/MyMap';
import theme from '@/styles/theme';

const MyPage = () => {
  const { data: myPageData, isLoading: groupMapsLoading } = useQuery(
    ['myMaps'],
    () => getGroupMaps()
  );

  if (myPageData && myPageData.code !== SUCCESS_MAPS_GROUP_DATA)
    return <div>API Error</div>;

  if (groupMapsLoading && myPageData.length === 0) {
    return <LoadingSpinner size="xLarge" />;
  }

  return (
    <>
      <Header />
      <section className="w-screen flex flex-col justify-center items-center gap-12 relative">
        <div className="flex items-end">
          <Icon size="medium" url={Icons.Map} alt="Map Icon" />
          <Text text="지도 관리" size="xLargeFill" color={theme.color.navy} />
        </div>
        {myPageData && myPageData.data.content.length > 0 ? (
          <div className="mb-12">
            <GridCards>
              {myPageData.data.content.map((item: MyMapType) => (
                <Link to={`/map/${item.id}`} key={item.id}>
                  <Card size="large">
                    <Item item={item} />
                  </Card>
                </Link>
              ))}
            </GridCards>
          </div>
        ) : (
          <div className="text-center mb-8 text-lg">
            지도 데이터가 존재하지 않습니다. <br /> 나만의 지도를 추가해주세요.
          </div>
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
      </section>
    </>
  );
};

export default MyPage;
