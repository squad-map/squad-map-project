import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const Title = styled.h2`
  margin-top: 1rem;
  font-style: italic;
  font-size: 1.5rem;
`;

export const Login = styled.div`
  ${flexbox({ dir: 'column', ai: 'center' })}
  gap: 1rem;
  padding: 2rem;
`;
