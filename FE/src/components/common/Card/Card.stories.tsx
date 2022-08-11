import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card from './index';

import theme from '@/styles/theme';

export default {
  title: 'Card',
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

export const Default = Template.bind({});
