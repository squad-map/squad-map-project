import * as S from './Image.style';

interface IImage {
  url: string;
  alt: string;
  cursor: boolean;
  onClick?: () => void;
}

const Image = ({ url, alt, cursor, ...props }: IImage) => (
  <S.Image src={url} alt={alt} cursor={cursor} {...props} />
);

export default Image;
