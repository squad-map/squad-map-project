import { ComponentStory, ComponentMeta } from '@storybook/react';

import MapForm from './index';

export default {
  title: 'pages/MapForm',
  component: MapForm,
} as ComponentMeta<typeof MapForm>;

const Template: ComponentStory<typeof MapForm> = () => <MapForm />;

export const Default = Template.bind({});
