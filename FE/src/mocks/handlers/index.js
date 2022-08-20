import { rest } from 'msw';

import { homeMapsData, myPageMapsData } from '../../constants/dummyData';

const GET_MAPS = rest.get('/', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(homeMapsData))
);

const MY_PAGE_MAPS = rest.get('/mypage', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(myPageMapsData))
);

export const handlers = [GET_MAPS, MY_PAGE_MAPS];
