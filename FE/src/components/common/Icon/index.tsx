import * as S from './Icon.style';

interface IIcon {
  url: string;
  alt: string;
  width?: string;
  height?: string;
  cursor?: boolean;
  onClick?: () => void;
}

const Icon = ({ url, alt, ...props }: IIcon) => (
  <S.Icon src={url} alt={alt} {...props} />
);

export default Icon;
