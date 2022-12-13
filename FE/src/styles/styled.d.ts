import '@emotion/react';
import { Color } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    color: Color;
  }
}
