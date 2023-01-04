interface IImage {
  url: string;
  alt: string;
  onClick?: () => void;
}

const Image = ({ url, alt, ...props }: IImage) => (
  <img className="block cursor-pointer" src={url} alt={alt} {...props} />
);

export default Image;
