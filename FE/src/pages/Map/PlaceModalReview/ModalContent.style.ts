import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
`;

export const Address = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.color.darkGray};
`;

export const TextArea = styled.textarea`
  width: 210px;
  height: 152px;
  background: ${theme.color.inputBackground};
  border-radius: 1rem;
  padding: 1rem;
  resize: none;
`;
