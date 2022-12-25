import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlaceModalReview from './index';

import GlobalModal from '@/components/common/GlobalModal';

export default {
  title: 'components/Map/PlaceModalReview',
  component: PlaceModalReview,
} as ComponentMeta<typeof PlaceModalReview>;

const Template: ComponentStory<typeof PlaceModalReview> = args => (
  <GlobalModal size="large" handleCancelClick={action('Cancel clicked')}>
    <PlaceModalReview {...args} />
  </GlobalModal>
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
  },
};
