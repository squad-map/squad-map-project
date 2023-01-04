import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ModifyCategoryModalInfo from './ModifyCategoryModalInfo';

export default {
  title: 'components/Category/ModifyCategoryModalInfo',
  component: ModifyCategoryModalInfo,
} as ComponentMeta<typeof ModifyCategoryModalInfo>;

const Template: ComponentStory<typeof ModifyCategoryModalInfo> = args => (
  <ModifyCategoryModalInfo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  clickedCategory: {
    category_color: '#FFA500',
    category_id: 2,
    category_name: '오렌지',
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
