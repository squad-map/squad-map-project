import { ComponentMeta, ComponentStory } from '@storybook/react';

import Form from './index';

export default {
  title: 'components/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = args => <Form {...args} />;

export const Default = Template.bind({});
