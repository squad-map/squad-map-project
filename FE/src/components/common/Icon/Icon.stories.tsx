import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './index';

import { Icons } from '@/assets/icons';

export default {
  title: 'common/Icon',
  component: Icon,
  args: {
    url: Icons.Login,
    alt: 'SquadMap Login Icon',
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const DefaultIcon = Template.bind({});

export const MediumIcon = () => (
  <Icon size="medium" url={Icons.Login} alt="Icon" />
);

export const LargeIcon = () => (
  <Icon size="large" url={Icons.Login} alt="Icon" />
);
