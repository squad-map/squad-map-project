import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from './index';

import theme from '@/styles/theme';

export default {
  title: 'common/Text',
  component: Text,
  hover: false,
  argTypes: {
    text: { defaultValue: 'TEXT' },
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
          `lightBlack`,
          'darkGray',
          `navy`,
          `darkNavy`,
          `clearOrange`,
          `green`,
          `silver`,
          `brown`,
          `lightBrown`,
          `yellow`,
          `titleActive`,
          `label`,
          `placeholder`,
          `inputBackground`,
        ],
      },
      defaultValue: 'lightBlack',
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = args => <Text {...args} />;

export const Default = Template.bind({});
