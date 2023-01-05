import { rest } from 'msw';

import { SUCCESS_MAPS_DATA } from '@/constants/code';
import { API_URL } from '@/constants/url';

export const GET_HOME_PUBLIC_MAPS = rest.get(
  `${API_URL}/map/public?lastMapId=:lastMapId`,
  (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
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
      })
    )
);
