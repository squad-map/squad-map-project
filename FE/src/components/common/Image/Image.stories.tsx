import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Images } from '@/assets/images';
import Image from '@/components/common/Image';

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
