import { css } from '@emotion/react';
import styled from '@emotion/styled';

const selectSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        grid-template-columns: 15.75rem 15.75rem 15.75rem;
      `;
    case 'medium':
      return css`
        grid-template-columns: 19rem 19rem 19rem;
      `;
    case 'large':
      return css`
        grid-template-columns: 22rem 22rem 22rem;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const GridCards = styled.section<{ size: string }>`
  ${({ size }) => selectSize(size)}
  position: relative;
  display: grid;
  grid-gap: 1rem;
`;
