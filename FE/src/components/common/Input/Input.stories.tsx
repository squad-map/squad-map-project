import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './index';

import theme from '@/styles/theme';

export default {
  title: 'Input',
  component: Input,
  args: {
    width: '29.5rem',
    height: '3.4375rem',
    placeholderText: 'What kind of place are you looking for?',
    color: theme.color.white,
    type: 'input',
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default = Template.bind({});
