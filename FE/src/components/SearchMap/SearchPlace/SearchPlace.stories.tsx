import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchPlace from './index';

import { searchPlaceData } from '@/constants/dummyData';

export default {
  title: 'components/SearchMap/SearchPlace',
  component: SearchPlace,
} as ComponentMeta<typeof SearchPlace>;

const Template: ComponentStory<typeof SearchPlace> = args => (
  <SearchPlace {...args} />
);

export const Default = Template.bind({});

Default.args = {
  searchAddressToCoordinate: () => action('searchAddressToCoordinate'),
  placeInfos: searchPlaceData,
};
