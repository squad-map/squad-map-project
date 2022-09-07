import * as S from './Navigation.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Overlay from '@/components/common/Overlay';

interface INavigationProps {
  menu: boolean;
  handleCloseMenu: () => void;
}

const Navigation = ({ menu, handleCloseMenu }: INavigationProps) => (
  <>
    {menu && <Overlay />}
    <S.Container menu={menu}>
      <S.CloseWrapper>
        <Icon
          data-testid="closeBtn"
          size="medium"
          url={Icons.Close}
          alt="Close Icon"
          cursor
          onClick={handleCloseMenu}
        />
      </S.CloseWrapper>
      <S.InnerContainer>
        <S.Box>
          <Icon size="medium" url={Icons.Login} alt="Login Icon" />
          <S.Text>로그인</S.Text>
        </S.Box>
        <S.Divider />
        <S.Box>
          <Icon size="medium" url={Icons.Map} alt="Map Icon" />
          <S.Text>전체지도</S.Text>
        </S.Box>
        <S.Box>
          <Icon size="medium" url={Icons.CategoryMap} alt="CategoryMap Icon" />
          <S.Text>카테고리별 지도</S.Text>
        </S.Box>
        <S.Divider />
        <S.Box>
          <Icon size="medium" url={Icons.Menual} alt="Manual Icon" />
          <S.Text>사용설명서</S.Text>
        </S.Box>
        <S.Box>
          <Icon size="medium" url={Icons.Error} alt="Error Icon" />
          <S.Text>오류사항 제보</S.Text>
        </S.Box>
        <S.Divider />
      </S.InnerContainer>
    </S.Container>
  </>
);

export default Navigation;
