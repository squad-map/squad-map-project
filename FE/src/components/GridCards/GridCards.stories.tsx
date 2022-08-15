import { ComponentStory, ComponentMeta } from '@storybook/react';

import GridCards from './index';

export default {
  title: 'GridCards',
  component: GridCards,
  parameters: {
    docs: {
      description: {
        story: `3 x 3 배열로 이루어진 그리드 UI 입니다. 홈 화면에서 쓰이고 있는 컴포넌트`,
      },
    },
  },
} as ComponentMeta<typeof GridCards>;

const Template: ComponentStory<typeof GridCards> = () => <GridCards />;

// 스토리북에서 비동기 처리 필요

export const Default = Template.bind({});
