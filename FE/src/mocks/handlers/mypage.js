import { rest } from 'msw';

import { myPageMapsData } from '../../constants/dummyData';

export const MY_PAGE_MAPS = rest.get('/mypage', (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(1000), ctx.json(myPageMapsData))
);

export const POST_MY_PAGE = rest.post('/mypage', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.delay(1000),
    ctx.json({
      status: 'success',
    })
  )
);

export const PATCH_MY_PAGE = rest.post('/mypage/:patchId', (req, res, ctx) => {
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
