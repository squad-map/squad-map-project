import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

import { Icons } from '@/assets/icons';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

const imageUrl = `url(${Icons.Plus}) no-repeat right 1rem`;

export default {
  title: 'Button',
  component: Button,
  disabled: false,
  loading: false,
  argTypes: {
    children: {
      defaultValue: <Text size="regular" text="REGULAR" color="#FFFFFF" />,
    },
    size: {
      control: {
        type: 'select',
        options: ['xLarge', 'large', 'xRegular', 'regular', 'small', 'xSmall'],
      },
      defaultValue: 'regular',
    },
    // background: {
    //   defaultValue: `url(${Icons.Plus}) no-repeat right 1rem`,
    // },
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
    <Button size="xLarge" color="#BCBCBC">
      <Text size="regular" text="카카오맵으로 보기" color="#191A1C" />
    </Button>
    <Button size="xLarge" color="#191A1C">
      <Text size="regular" text="등록하기" color="#FFFFFF" />
    </Button>
    <Button size="xLarge" color="#3F3F3F">
      <Text size="regular" text="취소하기" color="#FFFFFF" />
    </Button>
  </div>
);

export const largeButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="large" color="#191A1C">
      <Text size="regular" text="Github 계정으로 로그인" color="#FFFFFF" />
    </Button>
    <Button size="large" color="#17CE5F">
      <Text size="regular" text="Naver 계정으로 로그인" color="#000000" />
    </Button>
    <Button size="large" color="#BEE59A" background={imageUrl}>
      <Text size="regular" text="나만의 지도 만들기" color="#000000" />
    </Button>
  </div>
);

export const xRegularButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="xRegular" color="#FF0000">
      <Text size="regular" text="카테고리1" color="#000000" />
    </Button>
    <Button size="xRegular" color="#0000FF">
      <Text size="regular" text="카테고리2" color="#000000" />
    </Button>
    <Button size="xRegular" color="#F3B778">
      <Text size="regular" text="로그인" color="#000000" />
    </Button>
  </div>
);

export const regularButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="regular" color="#191A1C">
      <Text size="regular" text="검색" color="#FFFFFF" />
    </Button>
  </div>
);

export const smallButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="small" color="#191A1C">
      <Text size="regular" text="선택하기" color="#FFFFFF" />
    </Button>
    <Button {...Default.args} size="small" color="#191A1C">
      <Text size="regular" text="검색" color="#FFFFFF" />
    </Button>
  </div>
);

export const xSmallButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Button size="xSmall" color="#FF0000">
      <Text size="xSmall" text="검색" color="#000000" />
    </Button>
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
