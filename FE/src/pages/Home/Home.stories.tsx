import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';

import HomePage from './index';

import {
  GET_GROUP_MAPS_DATA,
  GET_HOME_PUBLIC_MAPS_DATA,
} from '@/constants/mypage';
import useSetRecoilUser from '@/hooks/useSetRecoillUser';

export default {
  title: 'pages/HomePage',
  component: HomePage,
  parameters: {
    msw: {
      handlers: [
        rest.get(`/map/public?lastMapId=1`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json(GET_HOME_PUBLIC_MAPS_DATA)
          )
        ),
        rest.get(`/map/group?name=:name`, (req, res, ctx) =>
          res(ctx.status(200), ctx.delay(1000), ctx.json(GET_GROUP_MAPS_DATA))
        ),
      ],
    },
  },
} as ComponentMeta<typeof HomePage>;

const LoggedInHomeTemplate: ComponentStory<typeof HomePage> = () => {
  useSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });
  return <HomePage />;
};

const LoggedOuHomeTemplate: ComponentStory<typeof HomePage> = () => {
  useSetRecoilUser(null);
  return <HomePage />;
};

export const loggedInHomeTemplate = LoggedInHomeTemplate.bind({});
export const loggedOutHomeTemplate = LoggedOuHomeTemplate.bind({});
