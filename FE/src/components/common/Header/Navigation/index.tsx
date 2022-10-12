import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './Navigation.style';

import { Icons } from '@/assets/icons';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Overlay from '@/components/common/Overlay';
import Login from '@/components/Login';
import Manual from '@/components/Manual';
import ReportError from '@/components/ReportError';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

interface INavigationProps {
  menu: boolean;
  handleCloseMenu: () => void;
}

const Navigation = ({ menu, handleCloseMenu }: INavigationProps) => {
  const isLoggedIn = useIsLoggedIn();
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    type: '',
  });

  const handleCancelClick = () => {
    setOpenModal({ isOpen: false, type: '' });
    handleCloseMenu();
  };

  return (
    <>
      {menu && openModal.isOpen === false && (
        <Overlay handleCancelClick={() => handleCancelClick()} />
      )}
      <S.Container menu={menu}>
        <S.CloseWrapper>
          <Icon
            data-testid="closeBtn"
            size="medium"
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCloseMenu}
          />
        </S.CloseWrapper>
        <S.InnerContainer>
          {isLoggedIn ? (
            <S.Box>
              <Icon size="medium" url={Icons.Home} alt="Home Icon" />
              <S.Text>홈으로</S.Text>
            </S.Box>
          ) : (
            <S.Box
              onClick={() => setOpenModal({ isOpen: true, type: 'login' })}
            >
              <Icon size="medium" url={Icons.Login} alt="Login Icon" />
              <S.Text>로그인</S.Text>
            </S.Box>
          )}
          <S.Divider />
          <S.Box>
            <Icon size="medium" url={Icons.Map} alt="Map Icon" />
            <S.Text>전체지도</S.Text>
          </S.Box>
          <S.Box>
            <Icon
              size="medium"
              url={Icons.CategoryMap}
              alt="CategoryMap Icon"
            />
            <S.Text>카테고리별 지도</S.Text>
          </S.Box>
          {isLoggedIn && (
            <>
              <S.Divider />
              <Link to="/mypage">
                <S.Box>
                  <Icon size="medium" url={Icons.Map} alt="Map Icon" />
                  <S.Text>나의지도</S.Text>
                </S.Box>
              </Link>
              <S.Box>
                <Icon
                  size="medium"
                  url={Icons.MyProfile}
                  alt="MyProfile Icon"
                />
                <S.Text>닉네임 변경</S.Text>
              </S.Box>
              <S.Divider />
            </>
          )}
          <S.Divider />
          <S.Box onClick={() => setOpenModal({ isOpen: true, type: 'manual' })}>
            <Icon size="medium" url={Icons.Menual} alt="Manual Icon" />
            <S.Text>사용설명서</S.Text>
          </S.Box>
          <S.Box
            onClick={() => setOpenModal({ isOpen: true, type: 'reporting' })}
          >
            <Icon size="medium" url={Icons.Error} alt="Error Icon" />
            <S.Text>오류사항 제보</S.Text>
          </S.Box>
          <S.Divider />
        </S.InnerContainer>
      </S.Container>
      {openModal.isOpen && (
        <GlobalModal
          size="medium"
          handleCancelClick={() => setOpenModal({ isOpen: false, type: '' })}
        >
          {openModal.type === 'login' && <Login />}
          {openModal.type === 'manual' && <Manual />}
          {openModal.type === 'reporting' && <ReportError />}
        </GlobalModal>
      )}
    </>
  );
};

export default Navigation;
