import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './index';

export default {
  title: 'common/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});

export const loggedInHeader = Template.bind({});

export const loggedOutHeader = Template.bind({});

loggedInHeader.parameters = {
  docs: {
    description: {
      story: '`유저 로그인된 상태일때의 헤더 모습입니다.`',
    },
  },
};

loggedOutHeader.parameters = {
  docs: {
    description: {
      story: '`유저 비로그인된 상태일때의 헤더 모습입니다.`',
    },
  },
};
