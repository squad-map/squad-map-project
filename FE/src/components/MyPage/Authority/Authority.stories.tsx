import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Authority from './index';

export default {
  title: 'components/MyPage/Authority',
  component: Authority,
} as ComponentMeta<typeof Authority>;

const Template: ComponentStory<typeof Authority> = args => (
  <Authority {...args} />
);

export const Default = Template.bind({});

Default.args = {
  mapId: 1,
  handleCancelClick: action('Popup Closed'),
};
