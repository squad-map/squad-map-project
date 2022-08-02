import styled from '@emotion/styled';

import { inlineFlexbox } from '@/styles/mixin';

export const LoginButton = styled.button<{
  textColor: string;
  bgColor: string;
}>`
  ${inlineFlexbox({ jc: 'center', ai: 'center' })}
  width: 21.25rem;
  height: 4rem;
  border-radius: 1rem;
  color: ${({ textColor }) => textColor};
  background-color: ${({ bgColor }) => bgColor};
`;
