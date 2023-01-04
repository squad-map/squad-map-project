import { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchForm from './index';

export default {
  title: 'components/Authority/SearchForm',
  component: SearchForm,
} as ComponentMeta<typeof SearchForm>;

// TODO: MSW 붙여서 요청 + 응답 테스팅 필요
const Template: ComponentStory<typeof SearchForm> = args => (
  <SearchForm {...args} />
);

export const Default = Template.bind({});

Default.args = {
  mapId: 1,
  groupMembers: ['muffin', 'Jinlog9', 'Ronny', 'Funny'],
};
