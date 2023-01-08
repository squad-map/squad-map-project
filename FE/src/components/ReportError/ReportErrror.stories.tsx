import { ComponentMeta, ComponentStory } from '@storybook/react';

import ReportError from './index';

export default {
  title: 'components/ReportError',
  component: ReportError,
} as ComponentMeta<typeof ReportError>;

const Template: ComponentStory<typeof ReportError> = () => <ReportError />;

export const Default = Template.bind({});
