import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import SearchForm from './index';

import { GET_FIND_NICKNAME_DATA } from '@/constants/user';

export default {
  title: 'components/Authority/SearchForm',
  component: SearchForm,
  parameters: {
    msw: {
      handlers: [
        rest.get(`/members?nickname=:nickname`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json(GET_FIND_NICKNAME_DATA)
          )
        ),
      ],
    },
  },
} as ComponentMeta<typeof SearchForm>;

// TODO: MSW 붙여서 요청 + 응답 테스팅 필요
const Template: ComponentStory<typeof SearchForm> = args => (
  <SearchForm {...args} />
);

export const Default = Template.bind({});

Default.args = {
  mapId: 1,
  groupMembers: ['muffin', 'Jinlog9', 'Ronny', 'Funny'],
};
