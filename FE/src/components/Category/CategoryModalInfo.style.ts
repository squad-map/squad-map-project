import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
  color: ${theme.color.navy};
`;

export const SubTitle = styled.p``;

export const Header = styled.header`
  ${flexbox({ dir: 'column', ai: 'center' })}
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Buttons = styled.div`
  width: 15rem;
  ${flexbox({})}
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Suffix = styled.div`
  ${flexbox({ ai: 'center' })}
  gap: 0.2rem;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  color: ${theme.color.lightGray};
  font-size: ${theme.fontSize.sm};
`;

export const ColorCircle = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ColorBox = styled.div`
  ${flexbox({})}
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: 1rem;
`;

export const ButtonBox = styled.div`
  margin-top: 1rem;
`;

export const ColumnBox = styled.div`
  width: 15rem;
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  ${flexbox({ dir: 'column', ai: 'center' })}
`;

export const ModalInfoWrapper = styled.section`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'center', ai: 'center' })}
`;
