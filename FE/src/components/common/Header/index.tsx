// Logged In & Logged Out
import { Link } from 'react-router-dom';

import * as S from './Header.style';

import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import theme from '@/styles/theme';

const Header = () => {
  const loggedIn = true;
  return (
    <S.Container>
      <Link to="/">
        <Image url={Images.Logo} alt="SquadMap Logo" cursor />
      </Link>
      <S.RightArea>
        <Button
          text={loggedIn ? '로그인' : '닉네임'}
          size="regular"
          color={theme.color.brown}
        />
        <Image url={Images.Menu} alt="Header Menu" cursor />
      </S.RightArea>
    </S.Container>
  );
};

export default Header;
