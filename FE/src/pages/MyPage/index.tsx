import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

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
  const [formType, setFormType] = useState({ isForm: false, type: 'create' });

  return (
    <>
      <Header />
      <S.TitleBox>
        <Icon size="medium" url={Icons.Map} alt="Map Icon" />
        <Text text="지도 관리" size="xLargeFill" color={theme.color.navy} />
      </S.TitleBox>
      <S.Contents>
        {formType.isForm ? (
          <Form type={formType.type} myPageData={myPageData} />
        ) : loading ? (
          <LoadingSpinner size="xLarge" />
        ) : (
          <>
            <S.GridWrapper>
              <GridCards size="large">
                {myPageData.map((item: IMyMap) => (
                  <Link to={`/mymap/${item.id}`}>
                    <Card size="large" key={item.id}>
                      <Item
                        item={item}
                        handleModifyButton={e => {
                          e.preventDefault();
                          setFormType({ isForm: true, type: 'modify' });
                        }}
                      />
                    </Card>
                  </Link>
                ))}
              </GridCards>
            </S.GridWrapper>
            <S.ButtonWrapper>
              <Button
                size="large"
                color={theme.color.navy}
                background={`url(${Icons.Plus}) no-repeat right 1rem`}
                onClick={() => setFormType({ isForm: true, type: 'create' })}
              >
                <Text
                  size="regular"
                  text="나만의 지도 만들기"
                  color={theme.color.white}
                />
              </Button>
            </S.ButtonWrapper>
          </>
        )}
      </S.Contents>
    </>
  );
};

export default MyPage;
