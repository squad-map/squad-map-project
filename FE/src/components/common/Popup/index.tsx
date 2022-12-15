import ReactDom from 'react-dom';

import Button from '../Button';
import Overlay from '../Overlay';

import * as S from './Popup.style';

import theme from '@/styles/theme';

interface PopupProps {
  handleSubmitClick: () => void;
  handleCancelClick: () => void;
  children: React.ReactNode;
}

const Popup = ({
  handleSubmitClick,
  handleCancelClick,
  children,
}: PopupProps) =>
  ReactDom.createPortal(
    <>
      <Overlay handleCancelClick={handleCancelClick} />
      <S.Popup>
        {children}
        <S.PopupButtonWrapper>
          <Button
            size="xSmall"
            color={theme.color.navy}
            onClick={handleSubmitClick}
          >
            확인
          </Button>
          <Button
            size="xSmall"
            color={theme.color.lightRed}
            onClick={handleCancelClick}
          >
            취소
          </Button>
        </S.PopupButtonWrapper>
      </S.Popup>
    </>,
    document.getElementById('globalModal-root') as HTMLElement
  );

export default Popup;
