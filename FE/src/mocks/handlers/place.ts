import { rest } from 'msw';

import {
  DELETE_PLACE_DATA,
  GET_PLACE_DETAIL_DATA,
  PATCH_PLACE_DATA,
  POST_PLACE_DATA,
} from '@/constants/place';
import { API_URL } from '@/constants/url';

export const GET_PLACE_DETAIL = rest.get(
  `${API_URL}/map/:mapId/places/:placeId`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(GET_PLACE_DETAIL_DATA))
);

export const POST_PLACE = rest.post(
  `${API_URL}/map/:mapId/places`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(POST_PLACE_DATA))
);

export const PATCH_PLACE = rest.patch(
  `${API_URL}/map/:mapId/places/:patchId`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(PATCH_PLACE_DATA))
);

export const DELETE_PLACE = rest.delete(
  `${API_URL}/map/:mapId/places/:placeId`,
  (req, res, ctx) => res(ctx.status(200), ctx.json(DELETE_PLACE_DATA))
);
