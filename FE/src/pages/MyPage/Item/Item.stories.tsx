import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Item from './index';

import Card from '@/components/common/Card';
import { myPageMapsData } from '@/constants/dummyData';

export default {
  title: 'MyPageItem',
  component: Item,
  args: {
    item: myPageMapsData[0],
  },
  parameters: {
    docs: {
      description: {
        story: `마이페이지 카드 안에 들어가는 데이터 아이템 형태`,
      },
    },
    msw: {
      handlers: [
        rest.get('/mypage', (req, res, ctx) =>
          res(ctx.status(200), ctx.json(myPageMapsData[0]))
        ),
      ],
    },
  },
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = args => (
  <Card size="large">
    <Item {...args} />
  </Card>
);

export const Default = Template.bind({});
