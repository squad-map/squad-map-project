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

export const MapInfos = styled.section`
  ${flexbox({ dir: 'column' })};
  max-height: 38.25rem;
  padding: 1rem;
  gap: 1rem;
  margin-top: 2rem;
  position: absolute;
  right: 1rem;
  z-index: 999;
`;
