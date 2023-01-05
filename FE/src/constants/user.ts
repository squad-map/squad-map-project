import { SUCCESS_GET_NICKNAMES, SUCCESS_NICKNAME_UPDATE } from './code';

export const GET_FIND_NICKNAME_DATA = {
  code: SUCCESS_GET_NICKNAMES,
  message: 'OK',
  data: [
    {
      member_id: 1,
      nickname: 'nickname',
      profile_image: 'image',
    },
    {
      member_id: 2,
      nickname: 'nickname2',
      profile_image: 'image2',
    },
    {
      member_id: 3,
      nickname: 'nickname3',
      profile_image: 'image3',
    },
    {
      member_id: 4,
      nickname: 'nickname4',
      profile_image: 'image4',
    },
    {
      member_id: 5,
      nickname: 'nickname5',
      profile_image: 'image4',
    },
  ],
};

export const PATCH_NICKNAME_DATA = {
  code: SUCCESS_NICKNAME_UPDATE,
  message: 'OK',
  data: {
    member_id: 1,
    nickname: 'update nickname',
  },
};
