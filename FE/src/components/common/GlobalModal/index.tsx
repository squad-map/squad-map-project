import ReactDom from 'react-dom';

import * as S from './GlobalModal.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Overlay from '@/components/common/Overlay';

interface IGlobalModal {
  size: 'small' | 'medium' | 'large';
  handleCancelClick: () => void;
  children: React.ReactNode;
}

const GlobalModal = ({
  size = 'small',
  handleCancelClick,
  children,
}: IGlobalModal) =>
  ReactDom.createPortal(
    <>
      <Overlay handleCancelClick={handleCancelClick} />
      <S.GlobalModal size={size} id="modal-wrapper">
        <S.GlobalModalCloseWrapper>
          <Icon
            size="medium"
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCancelClick}
          />
        </S.GlobalModalCloseWrapper>
        {children}
      </S.GlobalModal>
    </>,
    document.getElementById('globalModal-root') as HTMLElement
  );
export default GlobalModal;
