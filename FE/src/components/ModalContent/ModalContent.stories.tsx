import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import GlobalModal from '../common/GlobalModal';

import ModalContent from './index';

export default {
  title: 'components/ModalContent',
  component: ModalContent,
} as ComponentMeta<typeof ModalContent>;

const Template: ComponentStory<typeof ModalContent> = args => (
  <GlobalModal size="small" handleCancelClick={action('Modal Closed')}>
    <ModalContent {...args} />
  </GlobalModal>
);

export const Default = Template.bind({});

Default.args = {
  title: '타이틀',
  description: '설명',
  buttonText: '확인',
  handleButtonClick: action('Button Clicked'),
};
