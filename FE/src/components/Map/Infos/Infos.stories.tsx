import { ComponentMeta, ComponentStory } from '@storybook/react';

import Infos from './index';

import { categorized_places } from '@/constants/dummyData';

export default {
  title: 'components/Map/Infos',
  component: Infos,
} as ComponentMeta<typeof Infos>;

const Template: ComponentStory<typeof Infos> = args => <Infos {...args} />;

export const Default = Template.bind({});

Default.args = {
  infoData: [categorized_places],
  user: {
    host_id: 1,
    host_nickname: 'Muffin',
    host_profile_image: 'https://avatars.githubusercontent.com/u/45479309?v=4',
  },
};
