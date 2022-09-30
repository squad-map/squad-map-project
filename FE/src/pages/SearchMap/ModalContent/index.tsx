import * as S from './ModalContent.style';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { ISearchPlace } from '@/interfaces/ISearchPlace';
import theme from '@/styles/theme';

interface ModalContentProps {
  placeInfo: ISearchPlace;
}

const ModalContent = ({ placeInfo }: ModalContentProps) => {
  console.log(placeInfo);

  return (
    <S.ModalContent>
      <S.Title>{placeInfo.place_name}</S.Title>
      <S.SampleMap />
      <S.TextArea placeholder="당신의 이야기를 들려주세요." />
      <Button size="xLarge" color={theme.color.darkNavy}>
        <Text text="다음" size="regular" color={theme.color.white} />
      </Button>
      <Button size="xLarge" color={theme.color.navy}>
        <Text text="취소하기" size="regular" color={theme.color.white} />
      </Button>
    </S.ModalContent>
  );
};

export default ModalContent;
