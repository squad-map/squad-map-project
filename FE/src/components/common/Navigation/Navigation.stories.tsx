import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from './index';

import useSetRecoilUser from '@/hooks/useSetRecoillUser';

export default {
  title: 'common/Navigation',
  component: Navigation,
  args: {
    handleCloseMenu: action('Navigation Closed.'),
    menu: true,
  },
} as ComponentMeta<typeof Navigation>;

const LoggedInNavigationTemplate: ComponentStory<typeof Navigation> = args => {
  useSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });

  return <Navigation {...args} />;
};

const LoggedOutNavigationTemplate: ComponentStory<typeof Navigation> = args => {
  useSetRecoilUser(null);

  return <Navigation {...args} />;
};

export const loggedInNavigation = LoggedInNavigationTemplate.bind({});

export const loggedOutNavigation = LoggedOutNavigationTemplate.bind({});

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
