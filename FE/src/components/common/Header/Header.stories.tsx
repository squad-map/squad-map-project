import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './index';

import UseSetRecoilUser from '@/hooks/UseSetRecoillUser';

export default {
  title: 'common/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const LoggedInHeaderTemplate: ComponentStory<typeof Header> = () => {
  UseSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });

  return <Header />;
};

const LoggedOutHeaderTemplate: ComponentStory<typeof Header> = () => {
  UseSetRecoilUser(null);

  return <Header />;
};

export const loggedInHeader = LoggedInHeaderTemplate.bind({});

export const loggedOutHeader = LoggedOutHeaderTemplate.bind({});

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
