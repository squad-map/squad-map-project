import ReactDom from 'react-dom';

import * as S from './Modal.style';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import { ButtonClickEventHandler } from '@/types/eventHandler';

interface IModal {
  size: 'small' | 'medium' | 'large';
  handleCancelClick: ButtonClickEventHandler;
  children: React.ReactNode;
}

const Modal = ({ size = 'small', handleCancelClick, children }: IModal) =>
  ReactDom.createPortal(
    <>
      <S.ModalOverlay />
      <S.Modal size={size}>
        <S.ModalCloseWrapper>
          <Icon
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCancelClick}
          />
        </S.ModalCloseWrapper>
        {children}
      </S.Modal>
    </>,
    document.querySelector('#modal-root')!
  );

export default Modal;
