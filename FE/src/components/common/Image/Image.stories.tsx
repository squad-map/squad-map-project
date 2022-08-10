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

export const Default: ComponentStory<typeof Image> = args => (
  <Image {...args} />
);
