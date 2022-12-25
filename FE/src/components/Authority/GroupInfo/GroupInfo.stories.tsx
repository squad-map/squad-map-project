import { ComponentMeta, ComponentStory } from '@storybook/react';

import GroupInfo from './index';

import Card from '@/components/common/Card';

export default {
  title: 'components/GroupInfo',
  component: GroupInfo,
} as ComponentMeta<typeof GroupInfo>;

const Template: ComponentStory<typeof GroupInfo> = args => (
  <Card size="small">
    <GroupInfo {...args} />
  </Card>
);

export const Default = Template.bind({});
