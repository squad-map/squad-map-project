import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Description = styled.span`
  color: ${theme.color.gray};
  font-size: 0.875rem;
`;

export const Title = styled.h4`
  color: ${theme.color.gray};
`;

export const Item = styled.div`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'center', ai: 'center' })}
  gap: 1rem;
`;

export const GridCards = styled.section`
  position: relative;
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: 15.75rem 15.75rem 15.75rem;
  grid-gap: 1rem;
`;
