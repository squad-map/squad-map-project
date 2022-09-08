import * as S from './Input.style';

// import Icons from '@/assets/icons';

interface IInput {
  id?: string;
  width?: string;
  height?: string;
  placeholderText: string;
  color: string;
  type: string;
  background?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const Input = ({
  id,
  width = '29.5rem',
  height = '3.4375rem',
  placeholderText,
  color,
  type,
  background,
  value,
  onChange,
  onKeyPress,
}: IInput) => (
  <S.Input
    id={id}
    width={width}
    height={height}
    placeholder={placeholderText}
    color={color}
    type={type}
    background={background}
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
);

export default Input;
