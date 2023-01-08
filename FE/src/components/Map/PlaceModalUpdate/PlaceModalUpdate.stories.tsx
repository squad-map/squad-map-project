import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlaceModalUpdate from './index';

export default {
  title: 'components/Map/PlaceModalUpdate',
  component: PlaceModalUpdate,
} as ComponentMeta<typeof PlaceModalUpdate>;

const Template: ComponentStory<typeof PlaceModalUpdate> = args => (
  <PlaceModalUpdate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeInfo: {
    address: '서울 강남구 도곡동',
    category_id: 4,
    detail_link: 'http://place.map.kakao.com/17154013',
    latitude: 127.046595188917,
    longitude: 37.4818037639471,
    place_name: '양재천',
    place_id: 1,
    story: '양재천',
    comments: { content: [], size: 0, number_of_elements: 0, has_next: false },
  },
  categoryInfo: [
    { category_color: '#800000', category_id: 4, category_name: '걷기좋음' },
    { category_color: '#FFA500', category_id: 5, category_name: '로데오거리' },
  ],
};
