import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './index';

import { Icons } from '@/assets/icons';

export default {
  title: 'Icon',
  component: Icon,
  args: {
    url: Icons.Login,
    alt: 'SquadMap Login Icon',
    cursor: true,
  },
} as ComponentMeta<typeof Icon>;

export const Default: ComponentStory<typeof Icon> = args => <Icon {...args} />;
