import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const ListWrapper = styled.div`
  ${flexbox({ dir: 'column' })}
  width: 40rem;
  padding: 1rem;
  background-color: red;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1000;

  position: absolute;
  top: 30%;
  left: 5rem;
  transform: translateY(-30%);
`;

export const ListHeader = styled.header`
  height: 4rem;
  color: ${theme.color.navy};
`;

export const ListRow = styled.div`
  border-bottom: 1px solid ${theme.color.gray};
`;

export const ListContent = styled.div``;
