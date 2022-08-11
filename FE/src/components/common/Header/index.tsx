// Logged In & Logged Out
import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './Header.style';
import Navigation from './Navigation';

import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import theme from '@/styles/theme';

const Header = () => {
  const loggedIn = true;
  const [menu, setMenu] = useState(false);
  const handleCloseMenu = () => setMenu(false);
  const handleOpenMenu = () => setMenu(true);

  return (
    <S.Container>
      <S.Wrapper>
        <Link to="/">
          <Image url={Images.Logo} alt="SquadMap Logo" cursor />
        </Link>
        <S.RightArea>
          <Button
            text={loggedIn ? '로그인' : '닉네임'}
            size="regular"
            color={theme.color.brown}
          />
          <Image
            url={Images.Menu}
            alt="Header Menu"
            data-testid="menuBtn"
            cursor
            onClick={() => handleOpenMenu()}
          />
        </S.RightArea>
      </S.Wrapper>
      <Navigation menu={menu} handleCloseMenu={handleCloseMenu} />
    </S.Container>
  );
};

export default Header;
