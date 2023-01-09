import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const BackComponent = styled.div`
  ${flexbox({ dir: 'row', ai: 'center' })}
  gap: 1rem;
  width: 21.25rem;
  height: 4rem;
  padding: 1rem;
  background-color: ${theme.color.navy};
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;
`;

export const MapHeader = styled.header`
  ${flexbox({ dir: 'row', ai: 'center' })}
  gap: 1rem;
  width: 50%;
  height: 4rem;
  position: absolute;
  top: 2rem;
  z-index: 999;
`;
