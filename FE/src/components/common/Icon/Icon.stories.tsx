import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from './index';

import { Icons } from '@/assets/icons';

export default {
  title: 'Icon',
  component: Icon,
  args: {
    size: 'small',
    url: Icons.Login,
    alt: 'SquadMap Login Icon',
    cursor: true,
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const DefaultIcon = Template.bind({});
export const MediumIcon = Template.bind({});
MediumIcon.args = { ...DefaultIcon, size: 'medium' };
MediumIcon.parameters = {
  docs: {
    description: {
      story: `MediumIcon은 네비게이션 탭에서 주로 사용되어집니다.`,
    },
  },
};

export const LargeIcon = Template.bind({});
LargeIcon.args = { ...DefaultIcon, size: 'large' };
LargeIcon.parameters = {
  docs: {
    description: {
      story: `LargeIcon은 아직 사용되어지지 않습니다.`,
    },
  },
};
