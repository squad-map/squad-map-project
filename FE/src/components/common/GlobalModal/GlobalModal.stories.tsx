import { ComponentStory, ComponentMeta } from '@storybook/react';

import GlobalModal from '.';

export default {
  title: 'common/GlobalModal',
  component: GlobalModal,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'GlobalModal',
    },
    handleCancelClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof GlobalModal>;

const Template: ComponentStory<typeof GlobalModal> = args => (
  <GlobalModal {...args} />
);
export const Default = Template.bind({});

Default.parameters = {
  docs: {
    description: {
      story: '`Default(small) size의 팝업 형태입니다.`',
    },
  },
};
