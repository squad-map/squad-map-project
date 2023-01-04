import tw from 'twin.macro';

const selectSize = {
  small: tw`w-4 h-4`,
  medium: tw`w-8 h-8`,
  large: tw`w-12 h-12`,
};

interface IIcon {
  size: 'small' | 'medium' | 'large';
  url: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Icon = ({ size, url, alt, ...props }: IIcon) => (
  <img
    className="display-block cursor-pointer"
    css={selectSize[size]}
    src={url}
    alt={alt}
    {...props}
  />
);

export default Icon;
