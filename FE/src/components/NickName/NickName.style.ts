import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const Title = styled.h2`
  font-style: italic;
  font-size: 1.5rem;
`;

export const NickNameWrapper = styled.section`
  ${flexbox({ dir: 'column', ai: 'center' })}
  gap: 1.5rem;
  margin-top: 3rem;
`;
