import { rest } from 'msw';

import { myMapsData } from '../../constants/dummyData';

export const GET_MY_MAPS = rest.get('/mymap', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(100), ctx.json(myMapsData))
);
