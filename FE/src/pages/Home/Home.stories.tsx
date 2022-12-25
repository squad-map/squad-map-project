import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';

import HomePage from './index';

import { homeMapsData } from '@/constants/dummyData';

export default {
  title: 'pages/HomePage',
  component: HomePage,
  parameters: {
    msw: {
      handlers: [
        rest.get(
          `${process.env.SQUAD_MAP_OAUTH_URL}/map/public?page=${0}&size=${0}`,
          (req, res, ctx) =>
            res(ctx.status(200), ctx.delay(1000), ctx.json(homeMapsData))
        ),
      ],
    },
  },
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <HomePage />;

export const Default = Template.bind({});
