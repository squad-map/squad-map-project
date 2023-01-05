import { rest } from 'msw';

import {
  GET_MAP_CAEGORIES_DATA,
  POST_MAP_CATEGORY_DATA,
  PUT_MAP_CATEGORY_DATA,
  DELETE_MAP_CATEGORY_DATA,
} from '@/constants/category';
import { API_URL } from '@/constants/url';

export const GET_MAP_CAEGORIES = rest.get(
  `${API_URL}/map/:mapId/categories`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(GET_MAP_CAEGORIES_DATA))
);

export const POST_MAP_CATEGORY = rest.post(
  `${API_URL}/map/:mapId/categories`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(POST_MAP_CATEGORY_DATA))
);

export const PUT_MAP_CATEGORY = rest.put(
  `${API_URL}/map/:mapId/categories/:patchId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(PUT_MAP_CATEGORY_DATA))
);

export const DELETE_MAP_CATEGORY = rest.delete(
  `${API_URL}/map/:mapId/categories/:deleteId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(DELETE_MAP_CATEGORY_DATA))
);
