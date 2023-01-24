import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { setCookie } from './utils/cookie';

import App from '@/App';
import GlobalStyle from '@/styles/GlobalStyle';

if (process.env.NODE_ENV === 'development') {
  setCookie('access_token', 'local_access_token');
  const { worker } = require('./mocks/browsers/server');
  worker.start();
}

const root = createRoot(document.getElementById('root') as HTMLElement);

export const queryClient = new QueryClient();

root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </CookiesProvider>
);
