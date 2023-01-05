import { rest } from 'msw';

import { POST_LOGIN_DATA } from '@/constants/login';
import { API_URL } from '@/constants/url';

export const GITHUB_LOGIN = rest.post(
  `${API_URL}/login/github`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(POST_LOGIN_DATA))
);

export const NAVER_LOGIN = rest.post(
  `${API_URL}/login/naver`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(POST_LOGIN_DATA))
);
