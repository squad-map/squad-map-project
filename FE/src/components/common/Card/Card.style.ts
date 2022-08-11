import { css } from '@emotion/react';
import styled from '@emotion/styled';

const selectSize = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        width: 15.75rem;
        height: 11.25rem;
      `;
    case 'medium':
      return css`
        width: 18.875rem;
        height: 11.25rem;
      `;
    case 'large':
      return css`
        width: 22rem;
        height: 15.625rem;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const Card = styled.div<{ size: string; color: string }>`
  ${({ size }) => selectSize(size)}
  background-color: ${props => props.color};
  border-radius: 1rem;
`;
