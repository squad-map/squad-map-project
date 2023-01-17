import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icons } from '@/assets/icons';
import CreateCategoryModalInfo from '@/components/Category/CreateCategoryModalInfo';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Overlay from '@/components/common/Overlay';
import Login from '@/components/Login';
import Manual from '@/components/Manual';
import NickName from '@/components/NickName';
import ReportError from '@/components/ReportError';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

interface INavigationProps {
  menu: boolean;
  handleCloseMenu: () => void;
  type?: string;
}

let currentPath = '';

const Box = styled.div`
  ${flexbox({ ai: 'center' })}
  gap: 2rem;
  margin: 2rem 0;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 15.25rem;
  height: 1px;
  background-color: ${theme.color.lightGray};
`;

export const Text = styled.span`
  color: ${theme.color.lightGray};
  font-size: 1.25rem;
  font-weight: bold;
`;

const Navigation = ({ menu, handleCloseMenu, type }: INavigationProps) => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    type: '',
  });

  const handleCancelClick = () => {
    setOpenModal({ isOpen: false, type: '' });
    handleCloseMenu();
  };

  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();

    currentPath = location.pathname;
  }, [location]);

  return (
    <>
      {menu && openModal.isOpen === false && (
        <Overlay handleCancelClick={() => handleCancelClick()} />
      )}
      <div
        className={`w-[19.5rem] h-full px-8 flex flex-col justify-start items-end fixed top-0 right-0 bg-white z-[1000] ${
          menu ? 'translate-x-0' : 'translate-x-full'
        } duration-500`}
      >
        <div className="absolute top-8 right-8">
          <Icon
            data-testid="closeBtn"
            size="medium"
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCloseMenu}
          />
        </div>
        <section className="mt-[8.25rem]">
          {isLoggedIn ? (
            <Link to="/">
              <Box>
                <Icon size="medium" url={Icons.Home} alt="Home Icon" />
                <Text>홈으로</Text>
              </Box>
            </Link>
          ) : (
            <Box onClick={() => setOpenModal({ isOpen: true, type: 'login' })}>
              <Icon size="medium" url={Icons.Login} alt="Login Icon" />
              <Text>로그인</Text>
            </Box>
          )}
          <Divider />

          {isLoggedIn && (
            <div>
              <Link to="/mypage">
                <Box>
                  <Icon size="medium" url={Icons.Map} alt="Map Icon" />
                  <Text>나의지도</Text>
                </Box>
              </Link>
              {type === 'map' && (
                <div>
                  <Box
                    onClick={() =>
                      setOpenModal({ isOpen: true, type: 'getCategory' })
                    }
                  >
                    <Icon
                      size="medium"
                      url={Icons.CategoryMap}
                      alt="Manual Icon"
                    />
                    <Text>카테고리 수정</Text>
                  </Box>
                  <Box
                    onClick={() =>
                      setOpenModal({ isOpen: true, type: 'createCategory' })
                    }
                  >
                    <Icon
                      size="medium"
                      url={Icons.CategoryMap}
                      alt="Manual Icon"
                    />
                    <Text>카테고리 추가</Text>
                  </Box>
                </div>
              )}
              <Divider />
              <Box
                onClick={() => setOpenModal({ isOpen: true, type: 'nickname' })}
              >
                <Icon
                  size="medium"
                  url={Icons.MyProfile}
                  alt="MyProfile Icon"
                />
                <Text>닉네임 변경</Text>
              </Box>
              <Link to="/logout">
                <Box>
                  <Icon size="medium" url={Icons.Logout} alt="Logout Icon" />
                  <Text>로그아웃</Text>
                </Box>
              </Link>
            </div>
          )}

          <Box onClick={() => setOpenModal({ isOpen: true, type: 'manual' })}>
            <Icon size="medium" url={Icons.Menual} alt="Manual Icon" />
            <Text>사용설명서</Text>
          </Box>
          <Box
            onClick={() => setOpenModal({ isOpen: true, type: 'reporting' })}
          >
            <Icon size="medium" url={Icons.Error} alt="Error Icon" />
            <Text>오류사항 제보</Text>
          </Box>
        </section>
      </div>
      {openModal.isOpen && (
        <GlobalModal
          size="medium"
          handleCancelClick={() => setOpenModal({ isOpen: false, type: '' })}
        >
          {openModal.type === 'login' && <Login />}
          {openModal.type === 'manual' && <Manual />}
          {openModal.type === 'reporting' && <ReportError />}
          {openModal.type === 'nickname' && (
            <NickName handleCancelClick={handleCancelClick} />
          )}
          {openModal.type === 'createCategory' && (
            <CreateCategoryModalInfo setIsCategoryModal={handleCancelClick} />
          )}
          {openModal.type === 'getCategory' && (
            <div className="flex flex-col items-center gap-4 p-8">
              <p>서비스 준비중입니다👀...</p>
              해당 기능은 현재 보이는 지도에서 왼쪽 상단 카테고리를 클릭하면
              수정이 가능합니다.
            </div>
          )}
        </GlobalModal>
      )}
    </>
  );
};

export default Navigation;
