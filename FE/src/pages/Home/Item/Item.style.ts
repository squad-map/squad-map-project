import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const Title = styled.h4`
  color: ${theme.color.gray};
  font-size: ${theme.fontSize.md};
`;

export const Owner = styled.span`
  color: ${theme.color.gray};
  font-size: ${theme.fontSize.xs};
`;

export const Description = styled.span`
  color: ${theme.color.gray};
  font-size: ${theme.fontSize.sm};
`;

export const Item = styled.div`
  height: 100%;
  ${flexbox({ dir: 'column', jc: 'center', ai: 'center' })}
  gap: 1rem;
`;
