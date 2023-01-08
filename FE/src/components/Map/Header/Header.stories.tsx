import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Header from './index';

import { GET_MAP_CAEGORIES_DATA } from '@/constants/category';

export default {
  title: 'components/Map/Header',
  component: Header,
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
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  headerData: {
    map_id: 1,
    emoji: '📜',
    title: '테스트 지도',
    category_info: [],
  },
};
