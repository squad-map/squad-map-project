import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Authority from './index';

import { GET_MAP_GROUPMEMBERS_DATA } from '@/constants/group';

export default {
  title: 'components/MyPage/Authority',
  component: Authority,
  parameters: {
    msw: {
      handlers: [
        rest.get(`/map/:mapId/groups`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json(GET_MAP_GROUPMEMBERS_DATA)
          )
        ),
      ],
    },
  },
} as ComponentMeta<typeof Authority>;

const Template: ComponentStory<typeof Authority> = args => (
  <Authority {...args} />
);

export const Default = Template.bind({});

Default.args = {
  mapId: 1,
};
