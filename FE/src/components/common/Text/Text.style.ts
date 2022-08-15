import { css } from '@emotion/react';
import styled from '@emotion/styled';

const selectSize = (size: string) => {
  switch (size) {
    case 'xSmall':
      return css`
        font-size: 0.75rem;
        font-weight: 500;
      `;
    case 'small':
      return css`
        font-size: 0.875rem;
        font-weight: 500;
      `;
    case 'regular':
      return css`
        font-size: 1rem;
        font-weight: 500;
      `;
    case 'xRegular':
      return css`
        font-size: 1.125rem;
        font-weight: 500;
      `;
    case 'xRegularFill':
      return css`
        font-size: 1.125rem;
        font-weight: 700;
      `;
    case 'large':
      return css`
        font-size: 1.25rem;
        font-weight: 500;
      `;
    case 'xLarge':
      return css`
        font-size: 1.5rem;
        font-weight: 500;
      `;
    case 'xLargeFill':
      return css`
        font-size: 1.5rem;
        font-weight: 700;
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const Text = styled.div<{
  size: string;
  color: string;
  cursor?: boolean;
  hover?: boolean;
}>`
  ${({ size }) => selectSize(size)};
  color: ${props => props.color};
  cursor: ${props => props.cursor && 'pointer'};
  &:hover {
    text-decoration: ${props => props.hover && 'underline'};
  }
`;
