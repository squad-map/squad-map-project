import { rest } from 'msw';

import { homeMapsData } from '../../constants/dummyData';

const GET_MAPS = rest.get('/', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(homeMapsData))
);

export const handlers = [GET_MAPS];
