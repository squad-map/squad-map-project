import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const TitleBox = styled.div`
  ${flexbox({ jc: 'center', ai: 'flex-end' })}
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

export const GridWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const ButtonWrapper = styled.div`
  justify-self: end;
`;

export const Contents = styled.div`
  ${flexbox({ dir: 'column', jc: 'center', ai: 'center' })}
`;

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  margin-bottom: 4rem;
`;
