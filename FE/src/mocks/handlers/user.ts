import { rest } from 'msw';

import { API_URL } from '@/constants/url';
import { GET_FIND_NICKNAME_DATA, PATCH_NICKNAME_DATA } from '@/constants/user';

export const GET_FIND_NICKNAME = rest.get(
  `${API_URL}/members?nickname=:nickname`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(GET_FIND_NICKNAME_DATA))
);

export const PATCH_NICKNAME = rest.patch(
  `${API_URL}/members`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(PATCH_NICKNAME_DATA))
);
