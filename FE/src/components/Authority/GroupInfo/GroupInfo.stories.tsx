import { ComponentMeta, ComponentStory } from '@storybook/react';

import GroupInfo from './index';

import Card from '@/components/common/Card';

export default {
  title: 'components/Authority/GroupInfo',
  component: GroupInfo,
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
