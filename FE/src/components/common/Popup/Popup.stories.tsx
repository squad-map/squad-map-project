import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Popup from './index';

import Card from '@/components/common/Card';

export default {
  title: 'common/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = args => (
  <Card size="large">
    <Popup {...args} />
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  handleSubmitClick: action('OK Click'),
  handleCancelClick: action('Cancel Click'),
};
