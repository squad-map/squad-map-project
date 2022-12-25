import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './index';

export default {
  title: 'components/Map/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  headerData: {
    map_id: 1,
    emoji: '📜',
    title: '테스트 지도',
    category_info: [],
  },
};
