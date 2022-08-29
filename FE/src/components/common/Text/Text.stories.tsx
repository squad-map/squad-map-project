import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from './index';

import theme from '@/styles/theme';

export default {
  title: 'Text',
  component: Text,
  cursor: false,
  hover: false,
  argTypes: {
    text: { defaultValue: 'REGULAR TEXT' },
    size: {
      control: {
        type: 'select',
        options: [
          'xLargeFill',
          'xLarge',
          'large',
          'xRegularFill',
          'xRegular',
          'regular',
          'small',
          'xSmall',
        ],
      },
      defaultVAlue: 'regular',
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
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const Default = Template.bind({});
