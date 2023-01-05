import { rest } from 'msw';

import { homeMapsData, searchMapsData } from '../../constants/dummyData';

import { GET_HOME_PUBLIC_MAPS } from './home';
import { GET_MY_MAPS } from './mymap';
import { MY_PAGE_MAPS, POST_MY_PAGE, PATCH_MY_PAGE } from './mypage';

export const GET_SEARCH_MAPS = rest.get('/maps', (req, res, ctx) => {
  const searchValue = req.url.searchParams.get('searchValue');
  const type = req.url.searchParams.get('type');
  return res(ctx.status(200), ctx.delay(1000), ctx.json(searchMapsData));
});

export const handlers = [
  GET_HOME_PUBLIC_MAPS,

  GET_SEARCH_MAPS,
  MY_PAGE_MAPS,
  POST_MY_PAGE,
  PATCH_MY_PAGE,
  GET_MY_MAPS,
];
