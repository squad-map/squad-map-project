import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const PopupButtonWrapper = styled.div`
  ${flexbox({})};
  gap: 1rem;
`;

export const Popup = styled.section`
  ${flexbox({ dir: 'column', jc: 'center', ai: 'center' })};
  gap: 2rem;
  width: 20rem;
  height: 10rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.color.white};
  z-index: 1005;
  border-radius: 2rem;
`;
