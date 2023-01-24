import { rest } from 'msw';

import {
  DELETE_MAP_DATA,
  GET_GROUP_MAPS_DATA,
  GET_MAP_DETAIL_DATA,
  POST_MAP_DATA,
  PUT_MAP_DATA,
} from '@/constants/mypage';
import { API_URL } from '@/constants/url';

export const GET_GROUP_MAPS = rest.get(
  `${API_URL}/map/group?name=:name`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(GET_GROUP_MAPS_DATA))
);

export const POST_MAP = rest.post(`${API_URL}/map`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(POST_MAP_DATA))
);

export const PUT_MAP = rest.put(`${API_URL}/map/:patchId`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(PUT_MAP_DATA))
);

export const DELETE_MAP = rest.delete(
  `${API_URL}/map/:deleteId`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(DELETE_MAP_DATA))
);

export const GET_DETAIL_MAP = rest.get(
  `${API_URL}/map/:mapId`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(GET_MAP_DETAIL_DATA))
);
