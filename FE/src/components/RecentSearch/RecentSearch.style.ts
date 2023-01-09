import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Divider = styled.div`
  width: 25rem;
  height: 1px;
  margin: 1rem 0;
  background-color: ${theme.color.gray};
`;

export const Content = styled.div`
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
`;

export const Bottom = styled.div`
  ${flexbox({ jc: 'space-between', ai: 'center' })}
  width: 100%;
  height: 2rem;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  border-top: 1px solid ${theme.color.navy};
  background-color: ${theme.color.darkNavy};
`;

export const RecentSearchInner = styled.div`
  padding: 2.5rem;
`;

export const RecentSearch = styled.section`
  width: 30rem;
  height: 37.5rem;
  position: relative;
  border-radius: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  background-color: ${theme.color.white};
  z-index: 1000;
`;
