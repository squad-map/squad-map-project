import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

const selectSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        width: 25.25rem;
        height: 28.125rem;
      `;
    case 'medium':
      return css`
        width: 28.75rem;
        height: 36.25rem;
      `;
    case 'large':
      return css`
        width: 31.625rem;
        height: 46.25rem;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const ModalCloseWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  border: none;
  background: transparent;
  z-index: 1001;
  cursor: pointer;
`;

export const Modal = styled.section<{ size: string }>`
  ${({ size }) => selectSize(size)}
  ${flexbox({ dir: 'column', ai: 'center' })}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.color.white};
  z-index: 1000;
  border-radius: 2rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
`;
