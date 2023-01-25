import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { setCookie } from '@/utils/cookie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>{children}</Router>
      </RecoilRoot>
    </QueryClientProvider>
    <div id="globalModal-root" />
  </>
);

export const renderWithProvider = (ui: any, options?: any) => {
  setCookie('access_token', 'local_access_token');
  return render(ui, { wrapper, ...options });
};

export * from '@testing-library/react';

// override render method
export { renderWithProvider as render };
