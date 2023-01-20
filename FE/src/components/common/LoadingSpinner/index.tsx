import tw from 'twin.macro';

const selectSize = {
  small: tw`w-4 h-4 border-2 m-[-2px] top-[50%] left-[50% - 2px]`,
  medium: tw`w-8 h-8 border-[3px] m-[-4px] top-[50%] left-[50% - 4px]`,
  large: tw`w-12 h-12 border-4 m-[-8px] top-[50%] left-[50% - 6px]`,
  xLarge: tw`w-20 h-20 border-[6px] m-[-10px] top-[50%] left-[50%]`,
};

interface LoadingSpinnerProps {
  size: 'small' | 'medium' | 'large' | 'xLarge';
}

const LoadingSpinner = ({ size = 'small' }: LoadingSpinnerProps) => (
  <div
    className="absolute animate-spinner rounded-full border-2 border-solid border-gray border-y-navy"
    css={selectSize[size]}
  />
);

export default LoadingSpinner;
