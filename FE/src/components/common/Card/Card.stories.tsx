import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './index';

import theme from '@/styles/theme';

export default {
  title: 'common/Card',
  component: Card,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
    color: {
      control: {
        type: 'select',
        options: [`${theme.color.white}`, `${theme.color.silver}`],
      },
      defaultValue: `${theme.color.silver}`,
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const DefaultCard = Template.bind({});

export const MediumCard = Template.bind({});
MediumCard.args = { ...DefaultCard, size: 'medium' };
MediumCard.parameters = {
  docs: {
    description: {
      story: `MediumCard는 지도 페이지에서 사용되어집니다.`,
    },
  },
};
export const LargeCard = Template.bind({});
LargeCard.args = { ...DefaultCard, size: 'large' };
LargeCard.parameters = {
  docs: {
    description: {
      story: `LargeCard는 마이페이지에서 사용되어집니다.`,
    },
  },
};
