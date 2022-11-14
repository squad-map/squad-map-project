import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const SearchInput = styled.input`
  width: 20rem;
  height: 3.4375rem;
  border-radius: 1rem;
  padding: 0 2.5rem;
  margin-right: 1rem;
  color: ${theme.color.gray};
  border: 1px solid ${theme.color.black};
`;

export const AuthorityUL = styled.ul``;

export const AuthorityLiItem = styled.li<{ selectedIndex: boolean }>`
  margin: 0.75rem 0;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  color: ${props =>
    props.selectedIndex ? theme.color.white : theme.color.black};
  background-color: ${props => (props.selectedIndex ? theme.color.navy : '')};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const AuthorityButtonWrapper = styled.div`
  margin-top: auto;
`;

export const SearchContent = styled.div`
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
