import { rest } from 'msw';

import { API_URL } from '@/constants/url';

export const GET_HOME_PUBLIC_MAPS = rest.get(
  `${API_URL}/map/public?lastMapId=1`,
  (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        code: 'M-S03',
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
