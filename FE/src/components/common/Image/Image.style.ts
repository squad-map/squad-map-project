import styled from '@emotion/styled';

export const Image = styled.img<{ cursor?: boolean }>`
  display: block;
  cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
