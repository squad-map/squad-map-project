import { ThemeProvider } from '@emotion/react';
import * as ReactDOM from 'react-dom/client';

import App from '@/App';
import GlobalStyle from '@/styles/GlobalStyles';
import theme from '@/styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <App />
    <GlobalStyle />
  </ThemeProvider>
);
