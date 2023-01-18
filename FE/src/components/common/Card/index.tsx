import tw from 'twin.macro';

import theme from '@/styles/theme';

const selectSize = {
  small: tw`w-[15.75rem] h-[11.25rem]`,
  medium: tw`w-[18.875rem] h-[11.25rem]`,
  large: tw`w-[22rem] h-[15.625rem]`,
};

interface CardProps {
  size: 'small' | 'medium' | 'large';
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
const Card = ({
  size = 'small',
  color = theme.color.silver,
  children,
  onClick,
}: CardProps) => (
  <div
    role="presentation"
    className="p-4 bg-white rounded-2xl cursor-pointer hover:bg-silver"
    css={selectSize[size]}
    color={color}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Card;
