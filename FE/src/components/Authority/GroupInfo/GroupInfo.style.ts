import styled from '@emotion/styled';

import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

export const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
`;

export const Button = styled.button<{ bgColor: string }>`
  width: 3rem;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: ${props => props.bgColor};
`;

export const SearchSelectBox = styled.select`
  width: 5rem;
  border-radius: 1rem;
  padding: 0.2rem;
  border: 1px solid ${theme.color.black};
  cursor: pointer;
`;

export const SearchOption = styled.option``;

export const GroupInfo = styled.div`
  ${flexbox({ ai: 'center' })};
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const GroupInfoWrapper = styled.article`
  height: 10rem;
  margin: 1rem 0;
  overflow-y: auto;
`;
