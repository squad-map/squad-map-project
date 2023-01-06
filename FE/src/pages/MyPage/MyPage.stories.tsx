import { rest } from 'msw';

import MyPage from './index';

import { myPageMapsData } from '@/constants/dummyData';
import { API_URL } from '@/constants/url';

export default {
  title: 'pages/MyPage',
  component: MyPage,
  parameters: {
    msw: {
      handlers: [
        rest.get(`${API_URL}/map/group`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(myPageMapsData))
        ),
      ],
    },
  },
};

const Template = () => <MyPage />;

export const Default = Template.bind({});
