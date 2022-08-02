import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginButton } from './index';

export default {
  component: LoginButton,
  title: 'LoginButton',
  args: {
    textColor: '#FEFEFE',
    bgColor: '#14142B',
    children: 'Naver 계정으로 로그인',
  },
} as ComponentMeta<typeof LoginButton>;

export const Default: ComponentStory<typeof LoginButton> = args => (
  <LoginButton {...args} />
);
