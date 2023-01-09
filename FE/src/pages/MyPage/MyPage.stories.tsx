import { rest } from 'msw';

import MyPage from './index';

import { myPageMapsData } from '@/constants/dummyData';

export default {
  title: 'MyPage',
  component: MyPage,
  parameters: {
    msw: {
      handlers: [
        rest.get('/mypage', (req, res, ctx) =>
          res(ctx.status(200), ctx.json(myPageMapsData))
        ),
      ],
    },
  },
};

const Template = () => <MyPage />;

export const Default = Template.bind({});
