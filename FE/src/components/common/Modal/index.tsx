import ReactDom from 'react-dom';

import * as S from './Modal.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';

interface IModal {
  size: 'small' | 'medium' | 'large';
  handleCancelClick: () => void;
  children: React.ReactNode;
}

const Modal = ({ size = 'small', handleCancelClick, children }: IModal) =>
  ReactDom.createPortal(
    <>
      <S.ModalOverlay />
      <S.Modal size={size}>
        <S.ModalCloseWrapper>
          <Icon
            size="medium"
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCancelClick}
          />
        </S.ModalCloseWrapper>
        {children}
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
export default Modal;
