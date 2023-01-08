import { rest } from 'msw';

import {
  DELETE_MAP_GROUP_DATA,
  GET_MAP_GROUPMEMBERS_DATA,
  POST_MAP_GROUP_DATA,
  PUT_MAP_GROUP_DATA,
} from '@/constants/group';
import { API_URL } from '@/constants/url';

export const GET_MAP_GROUPMEMBERS = rest.get(
  `${API_URL}/map/:mapId/groups`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(GET_MAP_GROUPMEMBERS_DATA))
);

export const POST_MAP_GROUP = rest.post(
  `${API_URL}/map/:mapId/groups`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(POST_MAP_GROUP_DATA))
);

export const PUT_MAP_GROUP = rest.put(
  `${API_URL}/map/:mapId/groups`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(PUT_MAP_GROUP_DATA))
);

export const DELETE_MAP_GROUP = rest.delete(
  `${API_URL}/map/:mapId/groups/:memberId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(DELETE_MAP_GROUP_DATA))
);
