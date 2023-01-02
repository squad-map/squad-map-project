import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import NickName from './index';

export default {
  title: 'components/NickName',
  component: NickName,
} as ComponentMeta<typeof NickName>;

const Template: ComponentStory<typeof NickName> = args => (
  <NickName {...args} />
);

export const Default = Template.bind({});

Default.args = {
  handleCancelClick: action('cancel clicked'),
};
