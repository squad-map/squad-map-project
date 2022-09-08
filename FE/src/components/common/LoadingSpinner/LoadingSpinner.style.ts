import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const selectSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        width: 1rem;
        height: 1rem;
        border-width: 2px;
        margin-top: -0.5rem;
        margin-left: -0.5rem;
      `;
    case 'medium':
      return css`
        width: 2rem;
        height: 2rem;
        border-width: 3px;
        margin-top: -1rem;
        margin-left: -1rem;
      `;
    case 'large':
      return css`
        width: 3rem;
        height: 3rem;
        border-width: 4px;
        margin-top: -1.5rem;
        margin-left: -1.5rem;
      `;
    case 'xLarge':
      return css`
        width: 5rem;
        height: 5rem;
        border-width: 6px;
        margin-top: -3rem;
        margin-left: -3rem;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div<{ size: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid ${({ theme }) => theme.color.grey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.color.navy};
  animation: ${spinnerAnimation} 1s ease infinite;

  ${({ size }) => selectSize(size)};
`;
