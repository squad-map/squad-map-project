import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import PlaceInfos from './index';

import { GET_MAP_CAEGORIES_DATA } from '@/constants/category';
import { searchPlaceData } from '@/constants/dummyData';

export default {
  title: 'components/SearchMap/PlaceInfos',
  component: PlaceInfos,
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
} as ComponentMeta<typeof PlaceInfos>;

const Template: ComponentStory<typeof PlaceInfos> = args => (
  <PlaceInfos {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeInfos: searchPlaceData,
};
