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
        host_profile_image: 'image',
        places_count: 1,
      },
    ],
    size: 10,
    number_of_elements: 1,
    has_next: false,
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
        host_profile_image: 'image',
        places_count: 1,
      },
      {
        id: 2,
        map_name: 'second map',
        map_emoji: 'U+1F600',
        host_id: 1,
        host_nickname: 'nickname',
        host_profile_image: 'image',
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
    host_profile_image: 'image',
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
            latitude: 127.0,
            longitude: 37.0,
          },
          {
            place_id: 2,
            place_name: 'Hollys',
            address: 'Hollys Coffee',
            latitude: 127.0,
            longitude: 37.0,
          },
        ],
      },
    ],
  },
};
