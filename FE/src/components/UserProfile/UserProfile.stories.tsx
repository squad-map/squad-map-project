import { ComponentMeta, ComponentStory } from '@storybook/react';

import UserProfile from './index';

export default {
  title: 'components/UserProfile',
  component: UserProfile,
} as ComponentMeta<typeof UserProfile>;

const Template: ComponentStory<typeof UserProfile> = args => (
  <UserProfile {...args} />
);

export const Default = Template.bind({});

Default.args = {
  userProfile: {
    host_id: 1,
    host_nickname: 'Muffin',
    host_profile_image: 'https://avatars.githubusercontent.com/u/45479309?v=4',
  },
};
