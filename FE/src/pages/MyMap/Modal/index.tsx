import { css } from '@emotion/css';
import { useState } from 'react';

import GlobalModal from '@/components/common/GlobalModal';
import theme from '@/styles/theme';
import { MapType } from '@/types/map';

interface ModalProps {
  map: MapType;
}

// 마커 클릭시 나오는 모달 컴포넌트는 styled 컴포넌트 방식이 안먹혀서 아래와 같이 css 지정.
// ReactDOMServer.renderToStaticMarkup 시점이 styled로 css를 주는거보다 더 빨라서 그런거같다?
const Modal = ({ map }: ModalProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className={css({
          width: '120px',
          height: '80px',
          padding: '1rem',
          color: theme.color.lightGray,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        })}
        onClick={() => setOpenDetailModal(true)}
      >
        {map.address}
      </button>
      {openDetailModal && (
        <GlobalModal
          size="large"
          handleCancelClick={() => setOpenDetailModal(false)}
        >
          <div>testModal</div>
        </GlobalModal>
      )}
    </>
  );
};

export default Modal;
