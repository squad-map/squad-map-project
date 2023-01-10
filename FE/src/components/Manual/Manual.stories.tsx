import { ComponentStory, ComponentMeta } from '@storybook/react';

import Manual from './index';

export default {
  title: 'components/Manual',
  component: Manual,
} as ComponentMeta<typeof Manual>;

const Template: ComponentStory<typeof Manual> = () => <Manual />;

export const Default = Template.bind({});
