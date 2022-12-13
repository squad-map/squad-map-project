import { css } from '@emotion/react';
import styled from '@emotion/styled';

const selectSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        width: 1rem;
        height: 1rem;
      `;
    case 'medium':
      return css`
        width: 2rem;
        height: 2rem;
      `;
    case 'large':
      return css`
        width: 3rem;
        height: 3rem;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const Icon = styled.img<{
  size: string;
}>`
  ${({ size }) => selectSize(size)};
  display: block;
  cursor: pointer;
`;
