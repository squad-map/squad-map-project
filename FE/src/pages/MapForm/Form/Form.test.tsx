import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';

import Form from './index';

const server = setupServer(
  rest.post('http://localhost:3000/mypage', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('validate create Form', async () => {
  render(
    <Router>
      <Form type="create" />
    </Router>,
    { wrapper }
  );

  const mapNameInput = screen.getByLabelText(/지도명/i);
  const mapEmojiInput = screen.getByLabelText(/이모지/i);
  const mapAuthority = screen.getByLabelText(/Public/i);

  UserEvent.type(mapNameInput, '강남');
  UserEvent.type(mapEmojiInput, '👀');
  UserEvent.type(mapAuthority, 'true');

  await waitFor(() => {
    const submitButton = screen.getByText(/생성하기/i);
    UserEvent.click(submitButton);
  });

  // expect(await screen.findByText(/success/i)).toBeInTheDocument();
});
