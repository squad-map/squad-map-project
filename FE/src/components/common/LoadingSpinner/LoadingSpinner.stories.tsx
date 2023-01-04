import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingSpinner from '.';

export default {
  title: 'common/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = () => (
  <LoadingSpinner size="small" />
);
export const Default = Template.bind({});

export const MediumSpinner = () => <LoadingSpinner size="medium" />;

export const LargeSpinner = () => <LoadingSpinner size="large" />;

export const XLargeSpinner = () => <LoadingSpinner size="xLarge" />;
