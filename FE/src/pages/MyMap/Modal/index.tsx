import { css } from '@emotion/css';
import { useState } from 'react';

import GlobalModal from '@/components/common/GlobalModal';
import theme from '@/styles/theme';
import { MapType } from '@/types/map';

interface ModalProps {
  id: string;
  map: MapType;
}

// 마커 클릭시 나오는 모달 컴포넌트는 styled 컴포넌트 방식이 안먹혀서 아래와 같이 css 지정.
// ReactDOMServer.renderToStaticMarkup 시점이 styled로 css를 주는거보다 더 빨라서 그런거같다?
const Modal = ({ map }: ModalProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <>
      <button
        id={`button-${map.id}`}
        type="button"
        className={css({
          minWidth: '7.5rem',
          minHeight: '5rem',
          padding: '1rem',
          color: theme.color.lightGray,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        })}
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
