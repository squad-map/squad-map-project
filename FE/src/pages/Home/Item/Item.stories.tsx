import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import Item from './index';

import Card from '@/components/common/Card';
import { homeMapsData } from '@/constants/dummyData';

export default {
  title: 'HomeItem',
  component: Item,
  args: {
    item: homeMapsData[0],
  },
  parameters: {
    docs: {
      description: {
        story: `홈페이지 카드 안에 들어가는 데이터 아이템 형태`,
      },
    },
    msw: {
      handlers: [
        rest.get('/', (req, res, ctx) =>
          res(ctx.status(200), ctx.json(homeMapsData[0]))
        ),
      ],
    },
  },
} as ComponentMeta<typeof Item>;

const Template: ComponentStory<typeof Item> = args => (
  <Card size="small">
    <Item {...args} />
  </Card>
);

export const Default = Template.bind({});
