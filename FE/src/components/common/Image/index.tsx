import * as S from './Image.style';

interface IImage {
  url: string;
  alt: string;
  cursor: boolean;
}

const Image = ({ url, alt, cursor }: IImage) => (
  <S.Image src={url} alt={alt} cursor={cursor} />
);

export default Image;
