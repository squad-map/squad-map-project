import { rest } from 'msw';

import { homeMapsData, myPageMapsData } from '../../constants/dummyData';

const GET_MAPS = rest.get('/', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(homeMapsData))
);

const MY_PAGE_MAPS = rest.get('/mypage', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(myPageMapsData))
);

const POST_MY_PAGE = rest.post('/mypage', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json({
      status: 'success',
    })
  )
);

const PATCH_MY_PAGE = rest.post('/mypage/:patchId', (req, res, ctx) => {
  const { patchId } = req.params;
  const patchMypageData = req.body;
  res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json({
      patchId,
      ...patchMypageData,
    })
  );
});

export const handlers = [GET_MAPS, MY_PAGE_MAPS, POST_MY_PAGE, PATCH_MY_PAGE];
