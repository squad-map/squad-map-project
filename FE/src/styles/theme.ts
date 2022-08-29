const calcRem = (size: number): string => `${size / 16}rem`;

const color = {
  black: '#1B1B1B',
  lightBlack: '#191A1C',
  darkGray: '#3F3F3F',
  gray: '#777777',
  lightGray: '#BCBCBC',
  silver: '#EEEEEE',
  white: '#FFFFFF',
  green: '#90EE90',
  lightGreen: '#BEE59A',
  brown: '#F3B778',
  lightBrown: '#F6C790',
  titleActive: '#14142B',
  label: '#6E7191',
  placeholder: '#A0A3BD',
  inputBackground: '#EFF0F6',

  // Category Button colors

  blue: '#007AFF',
  lightBlue: '#C7EBFF',
  darkBlue: '#004DE3',
  red: '#FF3B30',
  lightRed: '#FFD1CF',
  darkRed: '#C60B00',
};

const fontSize = {
  xs: calcRem(12),
  sm: calcRem(16),
  md: calcRem(18),
  lg: calcRem(24),
  display: calcRem(32),
};

const theme = {
  color,
  fontSize,
};

export default theme;
