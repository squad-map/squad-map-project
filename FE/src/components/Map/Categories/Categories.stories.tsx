import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Categories from './Categories';

import { GET_MAP_CAEGORIES_DATA } from '@/constants/category';

export default {
  title: 'components/Map/Categories',
  component: Categories,
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
} as ComponentMeta<typeof Categories>;

const Template: ComponentStory<typeof Categories> = args => (
  <Categories {...args} />
);

export const Default = Template.bind({});

Default.args = {
  headerData: {
    map_id: 1,
    category_info: [],
  },
};
