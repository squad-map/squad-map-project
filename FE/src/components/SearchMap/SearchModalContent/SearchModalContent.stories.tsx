import { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchModalContent from './index';

import { searchPlaceData } from '@/constants/dummyData';

export default {
  title: 'components/SearchMap/SearchModalContent',
  component: SearchModalContent,
} as ComponentMeta<typeof SearchModalContent>;

const Template: ComponentStory<typeof SearchModalContent> = args => (
  <SearchModalContent {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeInfo: searchPlaceData[0],
};
