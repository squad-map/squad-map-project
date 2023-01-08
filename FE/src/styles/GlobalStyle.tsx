import { Global, css } from '@emotion/react';

import '../tailwind/index.css';
import './reset.css';
import './filter.css';
import './map.css';

const style = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 1rem;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    background-color: #f7f7fc;
    overflow-x: hidden;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
    padding: 0;
  }
  button {
    cursor: pointer;
    background-color: transparent;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
