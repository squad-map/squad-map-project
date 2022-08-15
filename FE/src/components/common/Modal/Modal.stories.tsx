import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './index';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      defaultValue: 'small',
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />;

export const DefaultModal = Template.bind({});

DefaultModal.parameters = {
  docs: {
    description: {
      story: '`Default(small) size의 팝업 형태입니다.`',
    },
  },
};
