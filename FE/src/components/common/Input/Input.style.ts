import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const Input = styled.input<{
  width: string;
  height: string;
  background?: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 1.3rem;
  padding: 0 2.5rem;
  border: 1px solid ${theme.color.navy};
  color: ${theme.color.placeholder};
  background: ${props => props.background};
`;
