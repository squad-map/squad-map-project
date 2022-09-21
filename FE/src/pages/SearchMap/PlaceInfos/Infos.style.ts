import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const ItemCategory = styled.div`
  ${flexbox({ dir: 'row', ai: 'center' })};
  gap: 1rem;
`;

export const Item = styled.div`
  ${flexbox({ dir: 'column' })};
  gap: 2rem;
`;

export const PlaceInfos = styled.section`
  ${flexbox({ dir: 'column' })};
  height: calc(100vh - 10rem);
  gap: 1rem;
  margin-top: 2rem;
  position: absolute;
  right: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
