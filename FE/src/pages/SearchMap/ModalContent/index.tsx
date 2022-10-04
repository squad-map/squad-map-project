import { useState } from 'react';
import { useQuery } from 'react-query';

import * as S from './ModalContent.style';

import { getMyMap } from '@/apis/mypage';
import CategoryModalInfo from '@/components/Category/CategoryModalInfo';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/staticMap';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import theme from '@/styles/theme';

interface ModalContentProps {
  placeInfo: ISearchPlace;
}

const ModalContent = ({ placeInfo }: ModalContentProps) => {
  const [isCategoryForm, setIsCategoryForm] = useState(false);

  const { data: myMapData, isLoading: loading } = useQuery(['myMap'], () =>
    getMyMap()
  );

  return (
    <S.ModalContent>
      {isCategoryForm ? (
        <>
          <S.PrevButtonWrapper>
            <Button
              size="small"
              color={theme.color.darkNavy}
              onClick={() => setIsCategoryForm(false)}
            >
              <Text text="이전" size="regular" color={theme.color.white} />
            </Button>
          </S.PrevButtonWrapper>
          <CategoryModalInfo
            headerData={{
              emoji: myMapData.emoji,
              title: myMapData.title,
              categories: myMapData.categories,
            }}
          />
        </>
      ) : (
        <>
          <S.Title>{placeInfo.place_name}</S.Title>
          <KakaoStaticMap placeInfo={placeInfo} />
          <S.TextArea placeholder="당신의 이야기를 들려주세요." />
          <Button
            size="xLarge"
            color={theme.color.darkNavy}
            onClick={() => setIsCategoryForm(true)}
          >
            <Text text="다음" size="regular" color={theme.color.white} />
          </Button>
        </>
      )}
    </S.ModalContent>
  );
};

export default ModalContent;
