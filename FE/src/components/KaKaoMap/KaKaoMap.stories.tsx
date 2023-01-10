import { ComponentMeta, ComponentStory } from '@storybook/react';

import KakaoMap from './index';

export default {
  title: 'components/KakaoMap',
  component: KakaoMap,
} as ComponentMeta<typeof KakaoMap>;

const Template: ComponentStory<typeof KakaoMap> = args => (
  <KakaoMap {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeInfos: [
    {
      address: '서울 강남구 신사동 668-33',
      detail_link: 'http://place.map.kakao.com/7990409',
      latitude: 127.039152029523,
      longitude: 37.5267558230172,
      place_name: '압구정로데오거리',
      place_id: 7990409,
    },
  ],
};
