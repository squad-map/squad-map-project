import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { inlineFlexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const loading = css`
  border: none;
  color: white;
  padding: 1rem;
  font-size: 16px;
`;

const selectTypes = (size: string, color: string) => {
  switch (size) {
    case 'xLarge':
      return css`
        width: 27.5rem;
        height: 4rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    case 'large':
      return css`
        width: 21.25rem;
        height: 4rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    case 'xRegular':
      return css`
        width: 9.5rem;
        height: 3.75rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    case 'regular':
      return css`
        width: 7rem;
        height: 3.4375rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    case 'small':
      return css`
        width: 7rem;
        height: 2rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    case 'xSmall':
      return css`
        width: 4rem;
        height: 2rem;
        border: none;
        color: ${theme.color.white};
        background-color: ${color};
      `;
    default:
      throw new Error(`${size} type is not found`);
  }
};

export const Button = styled.button<{
  size: string;
  color: string;
  background?: string;
}>`
  ${inlineFlexbox({ jc: 'center', ai: 'center' })}
  border-radius: 1rem;
  background: ${props => props.background};
  ${({ size, color }) => selectTypes(size, color)};

  :disabled {
    background-color: #e9ebee;
    color: #c5c8ce;
  }

  &:hover {
    opacity: 0.7;
  }
`;
