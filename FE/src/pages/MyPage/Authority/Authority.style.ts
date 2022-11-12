import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const AuthoritySearchInput = styled.input`
  width: 20rem;
  height: 3.4375rem;
  border-radius: 1rem;
  padding: 0 2.5rem;
  margin-right: 1rem;
  color: ${theme.color.gray};
  border: 1px solid ${theme.color.black};
`;

export const AuthorityButtonWrapper = styled.div`
  margin-top: auto;
`;

export const AuthorityLiItem = styled.li`
  margin: 0.75rem 0;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const AuthorityUL = styled.ul``;

export const AuthoritySearchContent = styled.div`
  width: 22rem;
  height: 10rem;
  padding: 0 1rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.black};
  z-index: 1000;
`;

export const AuthorityWrapper = styled.section`
  height: 100%;
  ${flexbox({ dir: 'column', ai: 'center' })}
  margin-top: 2rem;
  gap: 1rem;
  padding: 1.5rem;
`;
