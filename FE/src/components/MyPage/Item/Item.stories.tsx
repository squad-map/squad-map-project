import { ComponentMeta, ComponentStory } from '@storybook/react';

import Item from './index';

import Card from '@/components/common/Card';
import { myPageMapsData } from '@/constants/dummyData';
import useSetRecoilUser from '@/hooks/useSetRecoillUser';

export default {
  title: 'components/MyPage/Item',
  component: Item,
  args: {
    item: myPageMapsData.content[0],
  },
  parameters: {
    docs: {
      description: {
        story: `마이페이지 카드 안에 들어가는 데이터 아이템 형태`,
      },
    },
  },
} as ComponentMeta<typeof Item>;

const MapHostItem: ComponentStory<typeof Item> = args => {
  useSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });
  return (
    <Card size="large">
      <Item {...args} />
    </Card>
  );
};

const MapReadItem: ComponentStory<typeof Item> = args => {
  useSetRecoilUser({ member_id: 2, nickname: 'muffin2', profileImageUrl: '' });
  return (
    <Card size="large">
      <Item {...args} />
    </Card>
  );
};

export const mapHostItem = MapHostItem.bind({});
export const mapReadItem = MapReadItem.bind({});
