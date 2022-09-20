import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const Item = styled.div`
  ${flexbox({ dir: 'column', jc: 'space-between' })}
  height: 100%;
`;

export const ItemHeader = styled.header`
  ${flexbox({ jc: 'space-between' })}
  margin-top: 1rem;
`;

export const ItemFooter = styled.footer`
  ${flexbox({ jc: 'space-between' })}
`;
