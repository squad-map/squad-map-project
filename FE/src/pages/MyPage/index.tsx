import { useState } from 'react';
import { useQuery } from 'react-query';

import Form from './Form';
import Item from './Item';
import * as S from './MyPage.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Header from '@/components/common/Header';
import Icon from '@/components/common/Icon';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import GridCards from '@/components/GridCards';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';

const getMyPageMapsData = async () => {
  const response = await fetch('/mypage');
  const maps = await response.json();
  return maps;
};

const MyPage = () => {
  const { data: myPageData, isLoading: loading } = useQuery(['myMaps'], () =>
    getMyPageMapsData()
  );
  const [type, setType] = useState({ create: false, modify: false });
  const [modifyData, setModifyData] = useState<IMyMap>({} as IMyMap);

  const handleCreateButton = () => {
    setType({ ...type, create: true });
  };

  const handleModifyButton = (id: number) => {
    setType({ ...type, modify: true });
    setModifyData(myPageData.filter((data: IMyMap) => data.id === id)[0]);
  };

  return (
    <>
      <Header>
        <S.TitleBox>
          <Icon size="medium" url={Icons.Map} alt="Map Icon" />
          <Text
            text="지도 관리"
            size="xLargeFill"
            color={theme.color.lightBlack}
          />
        </S.TitleBox>
      </Header>
      {type.create || type.modify ? (
        <Form type={type} myPageData={modifyData} />
      ) : (
        <S.Contents>
          <S.GridWrapper>
            <GridCards size="large">
              {loading ? (
                <LoadingSpinner size="xLarge" />
              ) : (
                myPageData.map((item: IMyMap) => (
                  <Card size="large" key={`MyCard-${item.id}`}>
                    <Item
                      key={`Item-${item.id}`}
                      item={item}
                      handleModifyButton={() => handleModifyButton(item.id)}
                    />
                  </Card>
                ))
              )}
            </GridCards>
          </S.GridWrapper>

          <S.ButtonWrapper>
            <Button
              size="large"
              color={theme.color.lightGreen}
              background={`url(${Icons.Plus}) no-repeat right 1rem`}
              onClick={handleCreateButton}
            >
              <Text
                size="regular"
                text="나만의 지도 만들기"
                color={theme.color.white}
              />
            </Button>
          </S.ButtonWrapper>
        </S.Contents>
      )}
    </>
  );
};

export default MyPage;