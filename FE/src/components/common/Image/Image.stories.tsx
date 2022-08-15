import { ComponentMeta, ComponentStory } from '@storybook/react';

import Image from './index';

import { Images } from '@/assets/images';

export default {
  title: 'Image',
  component: Image,
  args: {
    url: Images.Logo,
    alt: 'SquadMap Logo',
    cursor: true,
  },
} as ComponentMeta<typeof Image>;

export const Template: ComponentStory<typeof Image> = args => (
  <Image {...args} />
);

export const DefaultImage = Template.bind({});

DefaultImage.parameters = {
  docs: {
    description: {
      story: `로고 이미지, 네비게이션 메뉴, 로그인 화면 이미지에 사용되어집니다.`,
    },
  },
};
