import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login from './index';

export default {
  title: 'components/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Default = Template.bind({});
