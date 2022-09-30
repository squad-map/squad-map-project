import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
`;

export const SampleMap = styled.div`
  width: 26.75rem;
  height: 15.625rem;
  border-radius: 1rem;
`;

export const TextArea = styled.textarea`
  width: 26.75rem;
  height: 10.625rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${theme.color.inputBackground};
  resize: none;
`;

export const ModalContent = styled.section`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'space-between', ai: 'center' })}
  gap: 1rem;
  padding: 2rem;
`;
