import {
  SUCCESS_DELETE_PLACE,
  SUCCESS_GET_PLACE,
  SUCCESS_PATCH_PLACE,
  SUCCESS_POST_PLACE,
} from './code';

export const GET_PLACE_DETAIL_DATA = {
  code: SUCCESS_GET_PLACE,
  message: 'OK',
  data: {
    place_id: 1,
    place_name: 'starbucks',
    address: 'my hometown',
    latitude: 37.491583,
    longitude: 127.031352,
    story: 'first place',
    detail_link: 'http://place.map.kakao.com/7990409',
    category_id: 1,
    comments: {
      content: [
        {
          member_id: 1,
          member_nickname: 'nickname',
          member_profile_image: 'image',
          comment_id: 1,
          content: "It's Good",
          written_at: '2023-01-02T13:04:09',
        },
        {
          member_id: 2,
          member_nickname: 'nickname2',
          member_profile_image: 'image2',
          comment_id: 2,
          content: "It's my favorite place",
          written_at: '2023-01-02T13:04:09',
        },
        {
          member_id: 3,
          member_nickname: 'nickname3',
          member_profile_image: 'image3',
          comment_id: 3,
          content: 'umm... so so',
          written_at: '2023-01-02T13:04:09',
        },
      ],
      size: 5,
      number_of_elements: 3,
      has_next: false,
    },
  },
};

export const POST_PLACE_DATA = {
  code: SUCCESS_POST_PLACE,
  message: 'OK',
  data: {
    place_id: 3,
  },
};

export const PATCH_PLACE_DATA = {
  code: SUCCESS_PATCH_PLACE,
  message: 'OK',
  data: {
    place_id: 1,
    place_name: 'starbucks',
    address: 'my hometown',
    latitude: 37.491583,
    longitude: 127.031352,
    story: 'updated description',
    detail_link: 'https://kakaomap',
    category_id: 2,
    comments: null,
  },
};

export const DELETE_PLACE_DATA = {
  code: SUCCESS_DELETE_PLACE,
  message: 'OK',
  data: null,
};
