import { ComponentMeta, ComponentStory } from '@storybook/react';

import PatchCommentList from './PatchCommentList';

import { GET_MAP_COMMENTS_DATA } from '@/constants/comment';

export default {
  title: 'components/Map/Comment/PatchCommentList',
  component: PatchCommentList,
} as ComponentMeta<typeof PatchCommentList>;

const Template: ComponentStory<typeof PatchCommentList> = args => (
  <PatchCommentList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  mapHostId: 1,
  content: GET_MAP_COMMENTS_DATA.data.content,
};
