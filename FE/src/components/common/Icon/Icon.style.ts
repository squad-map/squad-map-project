import styled from '@emotion/styled';

export const Icon = styled.img<{
  width?: string;
  height?: string;
  cursor?: boolean;
}>`
  display: block;
  width: ${props => props.width || '2rem'};
  height: ${props => props.height || '2rem'};
  cursor: ${props => (props.cursor ? 'pointer' : '')};
`;
