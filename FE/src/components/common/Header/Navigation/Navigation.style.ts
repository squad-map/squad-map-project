import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Text = styled.span`
  color: ${theme.color.lightGray};
  font-size: 1.25rem;
  font-weight: bold;
`;

export const Divider = styled.div`
  width: 15.25rem;
  height: 1px;
  color: ${theme.color.lightGray};
`;

export const Box = styled.div`
  ${flexbox({ ai: 'center' })}
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const InnerContainer = styled.section`
  margin-top: 8.25rem;
`;

export const Container = styled.section`
  ${flexbox({ dir: 'column' })}
  position: relative;
  width: 19.5rem;
  height: 100vh;
  padding: 0 2rem;
  background-color: ${theme.color.white};
`;
