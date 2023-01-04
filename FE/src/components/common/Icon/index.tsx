import tw from 'twin.macro';

const selectSize = {
  small: tw`w-[1rem] h-[1rem]`,
  medium: tw`w-[2rem] h-[2rem]`,
  large: tw`w-[4rem] h-[4rem]`,
};

interface IconProps {
  size: 'small' | 'medium' | 'large';
  url: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Icon = ({ size, url, alt, ...props }: IconProps) => (
  <img
    className="block cursor-pointer"
    css={selectSize[size]}
    src={url}
    alt={alt}
    {...props}
  />
);

export default Icon;
