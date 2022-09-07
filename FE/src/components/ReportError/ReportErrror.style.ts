import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const Title = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

export const Content = styled.div``;

export const ReportError = styled.div`
  ${flexbox({ dir: 'column', ai: 'center' })}
  gap: 1rem;
  padding: 2rem;
`;
