import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const TitleBox = styled.div`
  ${flexbox({ jc: 'center', ai: 'flex-end' })}
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

export const GridWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const EmptyContent = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  font-size: ${theme.fontSize.lg};
  line-height: 2rem;
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
