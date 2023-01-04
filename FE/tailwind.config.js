module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      black: '#1B1B1B',
      lightBlack: '#191A1C',
      darkGray: '#3F3F3F',
      navy: '#584CF4',
      darkNavy: '#534BC3',
      gray: '#777777',
      clearOrange: '#FFC02E',
      lightGray: '#BCBCBC',
      silver: '#EEEEEE',
      white: '#FFFFFF',
      green: '#90EE90',
      lightGreen: '#BEE59A',
      brown: '#F3B778',
      lightBrown: '#F6C790',
      yellow: '#F59E0B',
      titleActive: '#14142B',
      label: '#6E7191',
      placeholder: '#A0A3BD',
      inputBackground: '#EFF0F6',
      transparent: 'transparent',

      // Category Button colors

      blue: '#3B82F6',
      lightBlue: '#C7EBFF',
      darkBlue: '#004DE3',
      red: '#FF3B30',
      lightRed: '#FFD1CF',
      darkRed: '#C60B00',
      purple: '#3f3cbb',
    },
    animation: {
      spinner: 'spinner 1s ease infinite',
    },
  },
  plugins: [],
};
