import * as S from './Navigation.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';

const Navigation = () => (
  <S.Container>
    <S.CloseWrapper>
      <Icon url={Icons.Close} alt="Close Icon" cursor />
    </S.CloseWrapper>
    <S.InnerContainer>
      <S.Box>
        <Icon url={Icons.Login} alt="Login Icon" />
        <S.Text>로그인</S.Text>
      </S.Box>
      <S.Divider />
      <S.Box>
        <Icon url={Icons.Map} alt="Map Icon" />
        <S.Text>전체지도</S.Text>
      </S.Box>
      <S.Box>
        <Icon url={Icons.CategoryMap} alt="CategoryMap Icon" />
        <S.Text>카테고리별 지도</S.Text>
      </S.Box>
      <S.Divider />
      <S.Box>
        <Icon url={Icons.Menual} alt="Manual Icon" />
        <S.Text>사용설명서</S.Text>
      </S.Box>
      <S.Box>
        <Icon url={Icons.Error} alt="Error Icon" />
        <S.Text>오류사항 제보</S.Text>
      </S.Box>
      <S.Divider />
    </S.InnerContainer>
  </S.Container>
);

export default Navigation;
