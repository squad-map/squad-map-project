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
      category_color: '#FF4500',
    },
    {
      category_id: 2,
      category_name: 'second category',
      category_color: '#BC8F8F',
    },
    {
      category_id: 3,
      category_name: 'three category',
      category_color: '#FF0000',
    },
    {
      category_id: 4,
      category_name: 'four category',
      category_color: '#AAAAAA',
    },
    {
      category_id: 5,
      category_name: 'five category',
      category_color: '#DAA520',
    },
    {
      category_id: 6,
      category_name: 'six category',
      category_color: '#8A2BE2',
    },
    {
      category_id: 7,
      category_name: 'seven category',
      category_color: '#FF1493',
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
