import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Logo = styled.img`
  width: 13.25rem;
  height: 3.125rem;
  color: ${theme.color.black};
`;

export const Menu = styled.img`
  cursor: pointer;
`;

export const RightArea = styled.div`
  ${flexbox({ ai: 'center' })}
  gap: 2rem;
`;

export const Wrapper = styled.div`
  ${flexbox({ jc: 'space-between', ai: 'center' })}
  padding: 2rem;
`;

export const Container = styled.section`
  width: 100%;
  height: 18.875rem;
  background-color: ${theme.color.lightGreen};
`;