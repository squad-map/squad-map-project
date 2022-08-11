import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

import { Icons } from '@/assets/icons';
import theme from '@/styles/theme';

export default {
  title: 'Button',
  component: Button,
  disabled: false,
  loading: false,
  argTypes: {
    text: {
      defaultValue: 'regular',
    },
    size: {
      control: {
        type: 'select',
        options: ['xLarge', 'large', 'xRegular', 'regular', 'small', 'xSmall'],
      },
      defaultValue: 'regular',
    },
    background: {
      defaultValue: `url(${Icons.Plus}) no-repeat right 1rem`,
    },
    color: {
      control: {
        type: 'select',
        options: [
          `${theme.color.darkRed}`,
          `${theme.color.lightBlack}`,
          `${theme.color.darkGray}`,
          `${theme.color.black}`,
          `${theme.color.blue}`,
          `${theme.color.brown}`,
          `${theme.color.green}`,
          `${theme.color.inputBackground}`,
          `${theme.color.silver}`,
          `${theme.color.lightBlack}`,
          `${theme.color.lightBlue}`,
          `${theme.color.lightBrown}`,
          `${theme.color.lightGray}`,
          `${theme.color.lightGreen}`,
          `${theme.color.lightRed}`,
        ],
      },
      defaultValue: '#191A1C',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});

export const xLargeButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="xLarge" color="#BCBCBC" text="카카오맵으로 보기" />
    <Button size="xLarge" color="#191A1C" text="등록하기" />
    <Button size="xLarge" color="#3F3F3F" text="취소하기" />
  </div>
);

export const largeButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="large" color="#191A1C" text="Github 계정으로 로그인" />
    <Button size="large" color="#17CE5F" text="Naver 계정으로 로그인" />
    <Button size="large" color="#BEE59A" text="나만의 지도 만들기" />
  </div>
);

export const xRegularButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="xRegular" color="#FF0000" text="카테고리 1" />
    <Button size="xRegular" color="#0000FF" text="카테고리 2" />
    <Button size="xRegular" color="#F3B778" text="로그인" />
  </div>
);

export const regularButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="regular" color="#191A1C" text="검색" />
  </div>
);

export const smallButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="small" color="#191A1C" text="선택하기" />
    <Button
      {...Default.args}
      size="small"
      color="#191A1C"
      text="카테고리 추가"
    />
  </div>
);

export const xSmallButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="xSmall" color="#FF0000" text="카테고리" />
  </div>
);

xLargeButton.parameters = {
  docs: {
    description: {
      story:
        '`xLarge` 타입 버튼은 팝업내에서 사용됩니다. (다음, 취소하기, 네이버맵으로 보기 Button)',
    },
  },
  controls: {
    disabled: true,
  },
};

largeButton.parameters = {
  docs: {
    description: {
      story:
        '`large` 타입 버튼은 소셜로그인 버튼과 나만의 지도만들기, 장소 추천하기와 같은 버튼에 사용됩니다.',
    },
  },
  controls: {
    disabled: true,
  },
};

xRegularButton.parameters = {
  docs: {
    description: {
      story:
        '`xRegular` 타입 버튼은 헤더쪽(로그인, 닉네임) 또는 카테고리 버튼 에서 사용됩니다.',
    },
  },
  controls: {
    disabled: true,
  },
};

regularButton.parameters = {
  docs: {
    description: {
      story:
        '`regular` 타입 버튼은 현재는 검색 버튼 에서만 사용됩니다.(차후에 추가 예정)',
    },
  },
  controls: {
    disabled: true,
  },
};

smallButton.parameters = {
  docs: {
    description: {
      story:
        '`small` 타입 버튼은 선택하기, 카테고리 추가 버튼 에서 사용됩니다.',
    },
  },
  controls: {
    disabled: true,
  },
};

xSmallButton.parameters = {
  docs: {
    description: {
      story:
        '`xSmall` 타입 버튼은 카테고리 폼내의 카테고리 버튼들을 보여줄때 사용됩니다.',
    },
  },
  controls: {
    disabled: true,
  },
};
