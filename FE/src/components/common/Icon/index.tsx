import * as S from './Icon.style';

interface IIcon {
  size: 'small' | 'medium' | 'large';
  url: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Icon = ({ size, url, alt, ...props }: IIcon) => (
  <S.Icon size={size} src={url} alt={alt} {...props} />
);

export default Icon;
