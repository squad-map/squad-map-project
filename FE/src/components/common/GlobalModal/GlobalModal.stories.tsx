import { ComponentStory, ComponentMeta } from '@storybook/react';

import GlobalModal from './index';

export default {
  title: 'GlobalModal',
  component: GlobalModal,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
  },
} as ComponentMeta<typeof GlobalModal>;

const Template: ComponentStory<typeof GlobalModal> = args => (
  <GlobalModal {...args} />
);

export const DefaultGlobalModal = Template.bind({});

DefaultGlobalModal.parameters = {
  docs: {
    description: {
      story: '`Default(small) size의 팝업 형태입니다.`',
    },
  },
};
