import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from './index';

export default {
  title: 'Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = () => <Navigation />;

export const loggedInNavigation = Template.bind({});

export const loggedOutNavigation = Template.bind({});

loggedInNavigation.parameters = {
  docs: {
    description: {
      story: '`유저 로그인이된 상태일때의 네비게이션 모습입니다.`',
    },
  },
};

loggedOutNavigation.parameters = {
  docs: {
    description: {
      story: '`유저 비로그인된 상태일때의 네비게이션 모습입니다.`',
    },
  },
};
