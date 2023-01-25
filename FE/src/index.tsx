import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { setCookie } from './utils/cookie';

import App from '@/App';
import GlobalStyle from '@/styles/GlobalStyle';

export const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'development') {
  setCookie('access_token', 'local_access_token');
  const { worker } = require('./mocks/browsers/server');
  worker.start();
}

if (process.env.NODE_ENV !== 'test') {
  const root = createRoot(document.getElementById('root') as HTMLElement);

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
}
