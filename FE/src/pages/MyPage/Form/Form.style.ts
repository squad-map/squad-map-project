import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Label = styled.label`
  color: ${theme.color.lightGray};
  font-size: 20px;
  font-weight: bold;
`;

export const ColumnBox = styled.div`
  width: 19rem;
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
  margin: 1rem 0;
`;

export const EmailBox = styled.div`
  width: 19rem;
  ${flexbox({ dir: 'row', ai: 'center' })}
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const RadioBox = styled.div`
  ${flexbox({ dir: 'row', jc: 'space-between' })}
  padding: 0 1.5rem;
`;

export const ShareBox = styled.div`
  ${flexbox({ dir: 'column' })}
`;

export const ButtonWrapper = styled.div`
  margin-top: 2rem;
  ${flexbox({ dir: 'row' })}
  gap: 1rem;
`;

export const Form = styled.form`
  ${flexbox({ dir: 'column', ai: 'center' })}
`;
