import tw from 'twin.macro';

const selectSize = {
  small: tw`w-4 h-4 border-2 m-[-2px]`,
  medium: tw`w-8 h-8 border-[3px] m-[-4px]`,
  large: tw`w-12 h-12 border-4 m-[-8px]`,
  xLarge: tw`w-20 h-20 border-[6px] m-[-12px]`,
};

interface LoadingSpinnerProps {
  size: 'small' | 'medium' | 'large' | 'xLarge';
}

const LoadingSpinner = ({ size = 'small' }: LoadingSpinnerProps) => (
  <div
    css={selectSize[size]}
    className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] animate-spinner rounded-full border-2 border-solid border-gray border-y-navy"
  />
);

export default LoadingSpinner;
