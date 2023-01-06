import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Infos from './index';

import { GET_MAP_CAEGORIES_DATA } from '@/constants/category';
import { categorized_places } from '@/constants/dummyData';
import { API_URL } from '@/constants/url';
import UseSetRecoilUser from '@/hooks/UseSetRecoillUser';

export default {
  title: 'components/Map/Infos',
  component: Infos,
  args: {
    mapId: 1,
    mapHostId: 1,
    infoData: [categorized_places],
    userProfile: {
      host_id: 1,
      host_nickname: 'Muffin',
      host_profile_image:
        'https://avatars.githubusercontent.com/u/45479309?v=4',
    },
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(`/map/:mapId/categories`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json(GET_MAP_CAEGORIES_DATA)
          )
        ),
      ],
    },
  },
} as ComponentMeta<typeof Infos>;

const MapHostInfosTemplate: ComponentStory<typeof Infos> = args => {
  UseSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });
  return <Infos {...args} />;
};

const MapReadInfosTemplate: ComponentStory<typeof Infos> = args => {
  UseSetRecoilUser(null);
  return <Infos {...args} />;
};

export const mapHostInfosTemplate = MapHostInfosTemplate.bind({});
export const mapReadInfosTemplate = MapReadInfosTemplate.bind({});
