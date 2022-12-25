import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlaceInfos from './index';

import { searchPlaceData } from '@/constants/dummyData';

export default {
  title: 'components/SearchMap/PlaceInfos',
  component: PlaceInfos,
} as ComponentMeta<typeof PlaceInfos>;

const Template: ComponentStory<typeof PlaceInfos> = args => (
  <PlaceInfos {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeInfos: searchPlaceData,
};
