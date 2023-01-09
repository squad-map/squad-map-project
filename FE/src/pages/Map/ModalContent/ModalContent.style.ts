import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
`;

export const Address = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.color.darkGray};
`;

export const Header = styled.header`
  ${flexbox({ dir: 'column', ai: 'center' })}
  gap: 1rem;
`;

export const TextArea = styled.textarea`
  width: 210px;
  height: 152px;
  background: ${theme.color.inputBackground};
  border-radius: 1rem;
  padding: 1rem;
  resize: none;
`;

export const Review = styled.div``;

export const ReviewWrapper = styled.div``;

export const ReviewForm = styled.form`
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
`;

export const ReviewContents = styled.div`
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  ${flexbox({})}
  gap: 1rem;
`;

export const ModalContent = styled.section`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'space-between', ai: 'center' })}
  gap: 1rem;
  padding: 2rem;
`;
