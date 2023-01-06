import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import GroupInfo from './index';

import Card from '@/components/common/Card';
import { DELETE_MAP_GROUP_DATA, PUT_MAP_GROUP_DATA } from '@/constants/group';
import { API_URL } from '@/constants/url';

export default {
  title: 'components/Authority/GroupInfo',
  component: GroupInfo,
  msw: {
    handlers: [
      rest.put(`${API_URL}/map/:mapId/groups`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(PUT_MAP_GROUP_DATA))
      ),
      rest.delete(`${API_URL}/map/:mapId/groups/:memberId`, (req, res, ctx) =>
        res(ctx.status(200), ctx.delay(1000), ctx.json(DELETE_MAP_GROUP_DATA))
      ),
    ],
  },
} as ComponentMeta<typeof GroupInfo>;

const Template: ComponentStory<typeof GroupInfo> = args => (
  <Card size="large">
    <GroupInfo {...args} />
  </Card>
);

export const Default = Template.bind({});

Default.args = {
  mapId: 1,
  groupMembers: [
    {
      level: 'HOST',
      member_id: 1,
      member_nickname: 'muffin999',
      member_profile_image:
        'https://avatars.githubusercontent.com/u/45479309?v=4',
    },
    {
      level: 'READ',
      member_id: 2,
      member_nickname: 'Jinlog9',
      member_profile_image:
        'https://avatars.githubusercontent.com/u/45479309?v=4',
    },
  ],
};
