import * as S from './Input.style';

// import Icons from '@/assets/icons';

interface IInput {
  width?: string;
  height?: string;
  placeholderText: string;
  color: string;
  type: string;
  background?: string;
}

const Input = ({
  width = '29.5rem',
  height = '3.4375rem',
  placeholderText,
  color,
  type,
  background,
}: IInput) => (
  <S.Input
    width={width}
    height={height}
    placeholder={placeholderText}
    color={color}
    type={type}
    background={background}
  />
);

export default Input;
