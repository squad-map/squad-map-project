import { ComponentMeta, ComponentStory } from '@storybook/react';

import CreaetComment from './CreateComment';

export default {
  title: 'components/Map/Comment/CreaetComment',
  component: CreaetComment,
} as ComponentMeta<typeof CreaetComment>;

const Template: ComponentStory<typeof CreaetComment> = args => (
  <CreaetComment {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeId: 1,
};
