import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';

export const SearchInputWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const GridWrapper = styled.div`
  margin-bottom: 5rem;
`;

export const ButtonWrapper = styled.div`
  text-align: center;
`;

export const Contents = styled.div`
  ${flexbox({ dir: 'column', ai: 'center' })}
  margin-top: -10rem;
`;

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
