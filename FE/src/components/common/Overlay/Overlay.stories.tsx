import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Overlay from '.';

export default {
  title: 'components/Overlay',
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = args => <Overlay {...args} />;

export const Default = Template.bind({});

Default.args = {
  handleCancelClick: action('Popup closed'),
};
