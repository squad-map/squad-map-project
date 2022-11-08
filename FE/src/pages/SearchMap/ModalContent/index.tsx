import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './ModalContent.style';

import { getMapDetailInfo } from '@/apis/mypage';
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
  const { id } = useParams();
  const [stories, setStories] = useState('');
  const [isCategoryForm, setIsCategoryForm] = useState(false);

  const handleStoriesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStories(e.target.value);
  };

  const { data: mapData } = useQuery(
    ['Map'],
    () => {
      if (id) {
        getMapDetailInfo(id);
      }
    },
    {
      staleTime: 5 * 60 * 1000,
    }
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
            stories={stories}
            mapData={mapData}
            placeInfo={placeInfo}
          />
        </>
      ) : (
        <>
          <S.PrevButtonWrapper />
          <S.Title>{placeInfo.place_name}</S.Title>
          <KakaoStaticMap placeInfo={placeInfo} />
          <S.TextArea
            placeholder="당신의 이야기를 들려주세요."
            value={stories}
            onChange={handleStoriesChange}
          />
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
