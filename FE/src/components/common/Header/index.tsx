// Logged In & Logged Out
import React, { useState } from 'react';
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
import NickName from '@/components/NickName';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [nickNameModal, setNickNameModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleCloseMenu = () => setMenu(false);
  const handleOpenMenu = () => setMenu(true);
  const user = useRecoilValue(userState);

  return (
    <S.Container>
      <S.Wrapper>
        <Link to="/">
          <Image url={Images.Logo} alt="SquadMap Logo" />
        </Link>
        <S.RightArea>
          {user?.nickname ? (
            <Button
              size="regular"
              color={theme.color.white}
              onClick={() => setNickNameModal(true)}
            >
              <Text
                size="regular"
                text={user.nickname}
                color={theme.color.blue}
              />
            </Button>
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
      {user?.nickname && nickNameModal && (
        <GlobalModal
          size="small"
          handleCancelClick={() => setNickNameModal(false)}
        >
          <NickName handleCancelClick={() => setNickNameModal(false)} />
        </GlobalModal>
      )}
      {children}
    </S.Container>
  );
};

export default Header;
