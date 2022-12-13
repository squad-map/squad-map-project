import * as S from './ModalContent.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/staticMap';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';

const Modal = ({ placeInfo }: { placeInfo: PlaceDetail }) => (
  <S.ModalContent>
    <S.Header>
      <S.Title>{placeInfo.place_name}</S.Title>
      <S.Address>{placeInfo.address}</S.Address>
    </S.Header>
    <KakaoStaticMap placeInfo={placeInfo} />
    {/*  리뷰 작성 Form */}
    <S.ReviewContainer>
      <S.ReviewForm>
        <Text text="한 줄 리뷰 작성" size="small" color={theme.color.gray} />
        <S.TextArea maxLength={100} />
      </S.ReviewForm>
      <S.ReviewContents>
        <Text text="한 줄 리뷰들" size="small" color={theme.color.gray} />
        <S.ReviewWrapper>
          <S.Review>리뷰 1</S.Review>
          <S.Review>리뷰 2</S.Review>
          <S.Review>리뷰 3</S.Review>
        </S.ReviewWrapper>
      </S.ReviewContents>
    </S.ReviewContainer>
    <Button size="xLarge" color={theme.color.yellow}>
      <Text
        text="카카오맵으로 자세히 보기"
        size="regular"
        color={theme.color.lightBlack}
      />
    </Button>
  </S.ModalContent>
);

export default Modal;
