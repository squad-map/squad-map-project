import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
`;

export const TextArea = styled.textarea`
  width: 26.75rem;
  height: 13.625rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${theme.color.inputBackground};
  resize: none;
`;

export const PrevButtonWrapper = styled.div`
  position: fixed;
  left: 2rem;
`;

export const ModalContent = styled.section`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'space-between', ai: 'center' })}
  gap: 1rem;
  padding: 2rem;
`;
