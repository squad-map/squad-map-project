import {
  SUCCESS_DELETE_COMMENT,
  SUCCESS_GET_COMMENTS,
  SUCCESS_PATCH_COMMENT,
  SUCCESS_POST_COMMENT,
} from './code';

export const GET_MAP_COMMENTS_DATA = {
  code: SUCCESS_GET_COMMENTS,
  message: 'OK',
  data: {
    content: [
      {
        member_id: 2,
        member_nickname: 'nickname2',
        member_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        comment_id: 2,
        content: "It's my favorite place",
        written_at: '2023-01-02T13:03:39',
      },
      {
        member_id: 3,
        member_nickname: 'nickname3',
        member_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        comment_id: 3,
        content: 'umm... so so',
        written_at: '2023-01-02T13:03:40',
      },
    ],
    size: 5,
    number_of_elements: 2,
    has_next: false,
  },
};
export const POST_MAP_COMMENT_DATA = {
  code: SUCCESS_POST_COMMENT,
  message: 'OK',
  data: {
    member_id: 1,
    member_nickname: 'nickname',
    member_profile_image:
      'https://avatars.githubusercontent.com/u/45479309?v=4',
    comment_id: 4,
    content: 'Hi, I love it',
    written_at: '2023-01-02T22:03:40.767941',
  },
};
export const PATCH_MAP_COMMENT_DATA = {
  code: SUCCESS_PATCH_COMMENT,
  message: 'OK',
  data: {
    comment_id: 1,
  },
};
export const DELETE_MAP_COMMENT_DATA = {
  code: SUCCESS_DELETE_COMMENT,
  message: 'OK',
  data: null,
};
