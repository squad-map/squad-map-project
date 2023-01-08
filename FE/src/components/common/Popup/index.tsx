import ReactDom from 'react-dom';

import Button from '../Button';
import Overlay from '../Overlay';

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
      <section className="w-[20rem] h-[10rem] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-8 bg-white rounded-3xl z-[1005]">
        {children}
        <div className="flex gap-4">
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
        </div>
      </section>
    </>,
    document.getElementById('globalModal-root') as HTMLElement
  );

export default Popup;
