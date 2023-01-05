import {
  SUCCESS_GET_CATEGORIES,
  SUCCESS_POST_CATEGORY,
  SUCCESS_PUT_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
} from './code';

export const GET_MAP_CAEGORIES_DATA = {
  code: SUCCESS_GET_CATEGORIES,
  message: 'OK',
  data: [
    {
      category_id: 1,
      category_name: 'first category',
      category_color: '#584CF4',
    },
    {
      category_id: 2,
      category_name: 'second category',
      category_color: '#FFC02E',
    },
  ],
};

export const POST_MAP_CATEGORY_DATA = {
  code: SUCCESS_POST_CATEGORY,
  message: 'OK',
  data: {
    category_id: 4,
  },
};

export const PUT_MAP_CATEGORY_DATA = {
  code: SUCCESS_PUT_CATEGORY,
  message: 'OK',
  data: {
    category_id: 1,
    category_name: 'categoryName',
    category_color: 'color',
  },
};

export const DELETE_MAP_CATEGORY_DATA = {
  code: SUCCESS_DELETE_CATEGORY,
  message: 'OK',
  data: null,
};
