import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadingSpinner from './index';

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
  },
} as ComponentMeta<typeof LoadingSpinner>;

export const Template: ComponentStory<typeof LoadingSpinner> = args => (
  <LoadingSpinner {...args} />
);
