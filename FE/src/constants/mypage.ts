import {
  SUCCESS_DELETE_MAP,
  SUCCESS_GET_DETAIL_MAP,
  SUCCESS_MAPS_DATA,
  SUCCESS_MAPS_GROUP_DATA,
  SUCCESS_PATCH_MAP,
  SUCCESS_POST_MAP,
} from './code';

export const GET_HOME_PUBLIC_MAPS_DATA = {
  code: SUCCESS_MAPS_DATA,
  message: 'OK',
  data: {
    content: [
      {
        id: 1,
        map_name: 'first map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 2,
        map_name: 'second map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 3,
        map_name: 'three map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 4,
        map_name: 'four map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 5,
        map_name: 'five map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 6,
        map_name: 'six map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 7,
        map_name: 'seven map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 8,
        map_name: 'eight map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 9,
        map_name: 'nine map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 10,
        map_name: 'ten map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
    ],
    size: 10,
    number_of_elements: 10,
    has_next: false,
  },
};

export const GET_HOME_PUBLIC_MAPS_LAST_DATA = {
  code: SUCCESS_MAPS_DATA,
  message: 'OK',
  data: {
    content: [
      {
        id: 11,
        map_name: 'el map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 12,
        map_name: 'tw map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
    ],
    size: 2,
    number_of_elements: 2,
    has_next: true,
  },
};

export const GET_GROUP_MAPS_DATA = {
  code: SUCCESS_MAPS_GROUP_DATA,
  message: 'OK',
  data: {
    map_count: 2,
    content: [
      {
        id: 1,
        map_name: 'first map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
      {
        id: 2,
        map_name: 'second map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image:
          'https://avatars.githubusercontent.com/u/45479309?v=4',
        places_count: 1,
      },
    ],
  },
};

export const POST_MAP_DATA = {
  code: SUCCESS_POST_MAP,
  message: 'OK',
  data: {
    map_id: 3,
  },
};

export const PUT_MAP_DATA = {
  code: SUCCESS_PATCH_MAP,
  message: 'OK',
  data: {
    map_id: 1,
    map_name: 'changed map',
    map_emoji: 'U+1F600',
    full_disclosure: true,
  },
};

export const DELETE_MAP_DATA = {
  code: SUCCESS_DELETE_MAP,
  message: 'OK',
  data: null,
};

export const GET_MAP_DETAIL_DATA = {
  code: SUCCESS_GET_DETAIL_MAP,
  message: 'OK',
  data: {
    map_id: 1,
    map_name: 'first map',
    map_emoji: 'U+1F600',
    host_id: 1,
    host_nickname: 'nickname',
    host_profile_image: 'https://avatars.githubusercontent.com/u/45479309?v=4',
    places_count: 1,
    categorized_places: [
      {
        category_info: {
          category_id: 1,
          category_name: 'first category',
          category_color: '#FFA500',
        },
        places: [
          {
            place_id: 1,
            place_name: 'starbucks',
            address: 'my hometown',
            latitude: 37.49085074176696,
            longitude: 127.03342521371196,
          },
          {
            place_id: 2,
            place_name: 'Hollys',
            address: 'Hollys Coffee',
            latitude: 37.497436357008766,
            longitude: 127.02945657720217,
          },
          {
            place_id: 3,
            place_name: '구로역',
            address: '서울 구로구 구로동 603-13',
            latitude: 37.502918871343354,
            longitude: 126.88040083066709,
          },
        ],
      },
      {
        category_info: {
          category_id: 2,
          category_name: 'second category',
          category_color: '#0000FF',
        },
        places: [
          {
            place_id: 4,
            place_name: '더미데이터4',
            address: '더미데이터4',
            latitude: 37.49085074176661,
            longitude: 127.03342521371191,
          },
          {
            place_id: 5,
            place_name: '더미데이터5',
            address: '더미데이터6',
            latitude: 37.49743635700876,
            longitude: 127.02945657720211,
          },
        ],
      },
    ],
  },
};
