import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';

import SearchMap from './index';

import { searchMapsData } from '@/constants/dummyData';

export default {
  title: 'pages/SearchMap',
  component: SearchMap,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${API_URL}/map/${1}`, (req, res, ctx) =>
          res(ctx.status(200), ctx.delay(1000), ctx.json(searchMapsData))
        ),
      ],
    },
  },
} as ComponentMeta<typeof SearchMap>;

const Template: ComponentStory<typeof SearchMap> = () => <SearchMap />;

export const Default = Template.bind({});
