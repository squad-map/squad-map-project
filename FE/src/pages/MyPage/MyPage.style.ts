import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const TitleBox = styled.div`
  ${flexbox({ jc: 'center', ai: 'center' })}
  gap: 1rem;
`;

export const GridWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const ButtonWrapper = styled.div`
  justify-self: end;
`;

export const Contents = styled.div`
  ${flexbox({ dir: 'column', ai: 'center' })}
`;

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
