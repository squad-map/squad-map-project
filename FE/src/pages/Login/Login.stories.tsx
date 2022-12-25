import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPage from './index';

export default {
  title: 'pages/LoginPage',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = () => <LoginPage />;

export const Default = Template.bind({});
