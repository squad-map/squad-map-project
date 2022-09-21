import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const SearchInput = styled.input`
  width: 30rem;
  height: 3.4375rem;
  border-radius: 1rem;
  padding: 0 2.5rem;
  margin-right: 1rem;
  color: ${theme.color.gray};
`;

export const SearchPlace = styled.div`
  position: absolute;
  top: 2rem;
  right: 5rem;
  z-index: 999;
`;
