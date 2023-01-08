import React from 'react';
import ReactDom from 'react-dom';
import tw from 'twin.macro';

import { Icons } from '@/assets/icons';
import Icon from '@/components/common/Icon';
import Overlay from '@/components/common/Overlay';

const selectSize = {
  xSmall: tw`w-[20rem] h-[20rem]`,
  small: tw`w-[25.25rem] h-[28.125rem]`,
  medium: tw`w-[28.75rem] h-[36.25rem]`,
  large: tw`w-[31.625rem] h-[42.25rem]`,
};

interface GlobalModalProps {
  size: 'xSmall' | 'small' | 'medium' | 'large';
  handleCancelClick: (e?: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const GlobalModal = ({
  size = 'small',
  handleCancelClick,
  children,
}: GlobalModalProps) =>
  ReactDom.createPortal(
    <>
      <Overlay handleCancelClick={handleCancelClick} />
      <section
        css={selectSize[size]}
        className="flex flex-col items-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white z-[999] rounded-3xl"
        id="modal-wrapper"
      >
        <div className="absolute top-4 right-8 border-none bg-transparent z-[1001] cursor-pointer">
          <Icon
            size="medium"
            url={Icons.Close}
            alt="Close Icon"
            onClick={handleCancelClick}
          />
        </div>
        {children}
      </section>
    </>,
    document.getElementById('globalModal-root') as HTMLElement
  );
export default GlobalModal;
