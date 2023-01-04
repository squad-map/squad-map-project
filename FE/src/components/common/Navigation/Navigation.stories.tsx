import { ComponentStory, ComponentMeta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Navigation from './index';

export default {
  title: 'common/Navigation',
  component: Navigation,
  argTypes: {
    menu: {
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = args => (
  <Navigation {...args} />
);

export const loggedInNavigation = Template.bind({});

export const loggedOutNavigation = Template.bind({});

loggedInNavigation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const closeButtonElement = await canvas.getByTestId('closeBtn');

  await userEvent.click(closeButtonElement);
  await canvas.getByTestId('closeBtn');
};

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
