import { rest } from 'msw';

import { GET_HOME_PUBLIC_MAPS_DATA } from '@/constants/mypage';
import { API_URL } from '@/constants/url';

export const GET_HOME_PUBLIC_MAPS = rest.get(
  `${API_URL}/map/public?lastMapId=:lastMapId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(GET_HOME_PUBLIC_MAPS_DATA))
);
