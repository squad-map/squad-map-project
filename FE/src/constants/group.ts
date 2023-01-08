import {
  SUCCESS_DELETE_GROUP_MEMBER,
  SUCCESS_GET_GROUP_MEMBERS,
  SUCCESS_POST_GROUP_MEMBER,
  SUCCESS_PUT_GROUP_MEMBER,
} from './code';

export const GET_MAP_GROUPMEMBERS_DATA = {
  code: SUCCESS_GET_GROUP_MEMBERS,
  message: 'OK',
  data: [
    {
      member_id: 1,
      member_nickname: 'nickname',
      member_profile_image: 'image',
      level: 'HOST',
    },
    {
      member_id: 2,
      member_nickname: 'nickname2',
      member_profile_image: 'image2',
      level: 'MAINTAIN',
    },
    {
      member_id: 3,
      member_nickname: 'nickname3',
      member_profile_image: 'image3',
      level: 'READ',
    },
  ],
};

export const POST_MAP_GROUP_DATA = {
  code: SUCCESS_POST_GROUP_MEMBER,
  message: 'OK',
  data: {
    map_id: 1,
    member_id: 4,
    level: 'READ',
  },
};

export const PUT_MAP_GROUP_DATA = {
  code: SUCCESS_PUT_GROUP_MEMBER,
  message: 'OK',
  data: {
    map_id: 1,
    member_id: 2,
    level: 'MAINTAIN',
  },
};

export const DELETE_MAP_GROUP_DATA = {
  code: SUCCESS_DELETE_GROUP_MEMBER,
  message: 'OK',
  data: null,
};
