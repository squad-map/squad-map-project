// Logged In & Logged Out
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Image from '@/components/common/Image';
import Navigation from '@/components/common/Navigation';
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
    <>
      <section className="w-full h-[7.5rem] mb-16 bg-navy">
        <div className="flex justify-between items-center p-8">
          <Link to="/">
            <Image
              url={Images.Logo}
              width={200}
              height={40}
              alt="SquadMap Logo"
            />
          </Link>
          <div className="flex items-center gap-8">
            {user && user.nickname ? (
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.profileImageUrl}
                  alt="프로필이미지"
                />
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
              </div>
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
              width={64}
              height={64}
              data-testid="menuBtn"
              onClick={handleOpenMenu}
            />
          </div>
        </div>
        <Navigation menu={menu} handleCloseMenu={handleCloseMenu} />
        {children}
      </section>
      {openLoginModal && (
        <GlobalModal
          size="small"
          handleCancelClick={() => setOpenLoginModal(false)}
        >
          <Login />
        </GlobalModal>
      )}
      {user && user.nickname && nickNameModal && (
        <GlobalModal
          size="small"
          handleCancelClick={() => setNickNameModal(false)}
        >
          <NickName handleCancelClick={() => setNickNameModal(false)} />
        </GlobalModal>
      )}
    </>
  );
};

export default Header;
