import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';

import GridCards from './index';

import Card from '@/components/common/Card';
import { homeMapsData } from '@/constants/dummyData';
import Item from '@/pages/Home/Item';

export default {
  title: 'GridCards',
  component: GridCards,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
    children: {
      defaultValue: homeMapsData.map(item => (
        <Card size="small" key={item.id}>
          <Item item={item} />
        </Card>
      )),
    },
  },
  parameters: {
    docs: {
      description: {
        story: `3 x 3 배열로 이루어진 그리드 UI 입니다. 홈 화면과 마이페이지에서 사용되어지는 컴포넌트`,
      },
    },
    msw: {
      handlers: [
        rest.get('/', (req, res, ctx) =>
          res(ctx.status(200), ctx.json(homeMapsData))
        ),
      ],
    },
  },
} as ComponentMeta<typeof GridCards>;

const Template: ComponentStory<typeof GridCards> = args => (
  <GridCards {...args} />
);

export const Default = Template.bind({});
