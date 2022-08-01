import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlaceModalComment from './index';

import GlobalModal from '@/components/common/GlobalModal';
import useSetRecoilUser from '@/hooks/useSetRecoillUser';

export default {
  title: 'components/Map/PlaceModalComment',
  component: PlaceModalComment,
  args: {
    mapHostId: 1,
    placeInfo: {
      address: '서울 강남구 도곡동',
      category_id: 4,
      detail_link: 'http://place.map.kakao.com/17154013',
      latitude: 127.046595188917,
      longitude: 37.4818037639471,
      place_name: '양재천',
      place_id: 1,
      story: '양재천',
      comments: {
        content: [
          {
            member_id: 1,
            member_nickname: 'nickname',
            member_profile_image: 'image',
            comment_id: 1,
            content: "It's Good",
            written_at: '2023-01-02T13:04:09',
          },
        ],
        has_next: false,
        number_of_elements: 4,
        size: 5,
      },
    },
  },
} as ComponentMeta<typeof PlaceModalComment>;

const MapHostPlaceModalCommentTemplate: ComponentStory<
  typeof PlaceModalComment
> = args => {
  useSetRecoilUser({ member_id: 1, nickname: 'muffin1', profileImageUrl: '' });
  return (
    <GlobalModal size="large" handleCancelClick={action('Cancel clicked')}>
      <PlaceModalComment {...args} />
    </GlobalModal>
  );
};

const MapReadPlaceModalCommentTemplate: ComponentStory<
  typeof PlaceModalComment
> = args => {
  useSetRecoilUser({ member_id: 2, nickname: 'muffin2', profileImageUrl: '' });
  return (
    <GlobalModal size="large" handleCancelClick={action('Cancel clicked')}>
      <PlaceModalComment {...args} />
    </GlobalModal>
  );
};

export const mapHostPlaceModalComment = MapHostPlaceModalCommentTemplate.bind(
  {}
);

export const mapReadPlaceModalComment = MapReadPlaceModalCommentTemplate.bind(
  {}
);

mapHostPlaceModalComment.parameters = {
  docs: {
    description: {
      story: '`맵을 만든 HOST 권한 상태일때의 댓글 수정 모달입니다.`',
    },
  },
};

mapReadPlaceModalComment.parameters = {
  docs: {
    description: {
      story: '`기본 READ 권한 상태일때의 댓글 수정 모달입니다.`',
    },
  },
};
