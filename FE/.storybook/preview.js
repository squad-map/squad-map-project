import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src';
import { initialize, mswDecorator } from "msw-storybook-addon";

// MSW 초기화 함수 실행
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  mswDecorator,
  (Story) => (
    <>
     <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
                <Story />
            </ThemeProvider>
        </RecoilRoot>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
];