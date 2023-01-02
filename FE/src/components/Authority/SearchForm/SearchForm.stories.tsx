import { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchForm from './index';

export default {
  title: 'components/SearchForm',
  component: SearchForm,
} as ComponentMeta<typeof SearchForm>;

const Template: ComponentStory<typeof SearchForm> = args => (
  <SearchForm {...args} />
);

export const Default = Template.bind({});
