import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryModalInfo from './CategoryModalInfo';

export default {
  title: 'components/Category/CategoryModalInfo',
  component: CategoryModalInfo,
} as ComponentMeta<typeof CategoryModalInfo>;

const Template: ComponentStory<typeof CategoryModalInfo> = args => (
  <CategoryModalInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  headerData: {
    category_info: [
      {
        category_color: '#FFA500',
        category_id: 2,
        category_name: '오렌지',
      },
    ],
    emoji: '⭐\u0010',
    map_id: 1,
    title: '테스트지도',
  },
  mapCategories: [
    {
      category_color: '#AAAAAA',
      category_id: 1,
      category_name: '테스트',
    },
    { category_color: '#FFA500', category_id: 2, category_name: '오렌지' },
  ],
  setIsCategoryModal: action('Modal Closed'),
};
