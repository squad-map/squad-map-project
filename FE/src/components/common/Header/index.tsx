// Logged In & Logged Out
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import * as S from './Header.style';
import Navigation from './Navigation';

import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import Login from '@/components/Login';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleCloseMenu = () => setMenu(false);
  const handleOpenMenu = () => setMenu(true);
  const user = useRecoilValue(userState);

  return (
    <S.Container>
      <S.Wrapper>
        <Link to="/">
          <Image url={Images.Logo} alt="SquadMap Logo" cursor />
        </Link>
        <S.RightArea>
          {user?.nickname ? (
            <Text
              size="regular"
              text={user.nickname}
              color={theme.color.white}
            />
          ) : (
            <Button
              size="small"
              color={theme.color.transparent}
              onClick={() => setOpenLoginModal(true)}
            >
              <Text size="regular" text="로그인" color={theme.color.white} />
            </Button>
          )}
          <Image
            url={Images.Menu}
            alt="Header Menu"
            data-testid="menuBtn"
            cursor
            onClick={handleOpenMenu}
          />
        </S.RightArea>
      </S.Wrapper>
      <Navigation menu={menu} handleCloseMenu={handleCloseMenu} />
      {openLoginModal && (
        <GlobalModal
          size="small"
          handleCancelClick={() => setOpenLoginModal(false)}
        >
          <Login />
        </GlobalModal>
      )}
      {children}
    </S.Container>
  );
};

export default Header;
