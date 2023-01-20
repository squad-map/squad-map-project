import { rest } from 'msw';

import {
  GET_MAP_COMMENTS_DATA,
  POST_MAP_COMMENT_DATA,
  PATCH_MAP_COMMENT_DATA,
  DELETE_MAP_COMMENT_DATA,
} from '@/constants/comment';
import { API_URL } from '@/constants/url';

export const GET_MAP_COMMENTS = rest.get(
  `${API_URL}/map/:mapId/places/:placeId/comments?lastCommentId=:lastCommentId&size=:size`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(GET_MAP_COMMENTS_DATA))
);

export const POST_MAP_COMMENT = rest.post(
  `${API_URL}/map/:mapId/places/:placeId/comments`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(POST_MAP_COMMENT_DATA))
);

export const PATCH_MAP_COMMENT = rest.patch(
  `${API_URL}/comments/:commentId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(PATCH_MAP_COMMENT_DATA))
);

export const DELETE_MAP_COMMENT = rest.delete(
  `${API_URL}/comments/:commentId`,
  (req, res, ctx) =>
    res(ctx.status(200), ctx.delay(1000), ctx.json(DELETE_MAP_COMMENT_DATA))
);
