import * as S from './Icon.style';

import { ButtonClickEventHandler } from '@/types/eventHandler';

interface IIcon {
  url: string;
  alt: string;
  width?: string;
  height?: string;
  cursor?: boolean;
  onClick?: ButtonClickEventHandler;
}

const Icon = ({ url, alt, ...props }: IIcon) => (
  <S.Icon src={url} alt={alt} {...props} />
);

export default Icon;
