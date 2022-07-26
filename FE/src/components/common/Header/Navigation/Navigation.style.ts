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
  background-color: ${theme.color.lightGray};
`;

export const Box = styled.div`
  ${flexbox({ ai: 'center' })}
  gap: 2rem;
  margin: 2rem 0;
  cursor: pointer;
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const InnerContainer = styled.section`
  margin-top: 8.25rem;
`;

export const Container = styled.section<{ menu: boolean }>`
  ${flexbox({ dir: 'column', jc: 'flex-start', ai: 'flex-end' })}
  position: fixed;
  top: 0;
  right: 0;
  width: 19.5rem;
  height: 100%;
  padding: 0 2rem;
  background-color: ${theme.color.white};
  transform: ${props => (props.menu ? 'translateX(0)' : 'translateX(100%)')};
  transition: 0.5s;
  z-index: 1000;
`;
