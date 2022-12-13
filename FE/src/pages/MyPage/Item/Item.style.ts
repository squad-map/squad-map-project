import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const ItemManageMent = styled.div`
  ${flexbox({ ai: 'center' })};
  gap: 1rem;
`;

export const Item = styled.div`
  ${flexbox({ dir: 'column', jc: 'space-between' })}
  height: 100%;
`;

export const ItemHeader = styled.header`
  ${flexbox({ jc: 'space-between', ai: 'center' })};
`;

export const ItemFooter = styled.footer`
  ${flexbox({ jc: 'space-between' })}
`;
