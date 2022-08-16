import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';

import GridCards from './index';

import { homeMapsData } from '@/constants/dummyData';

export default {
  title: 'GridCards',
  component: GridCards,
  parameters: {
    docs: {
      description: {
        story: `3 x 3 배열로 이루어진 그리드 UI 입니다. 홈 화면에서 쓰이고 있는 컴포넌트`,
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

const Template: ComponentStory<typeof GridCards> = () => <GridCards />;

export const Default = Template.bind({});
