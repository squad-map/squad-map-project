import * as S from './Input.style';

interface IInput {
  id?: string;
  width?: string;
  height?: string;
  placeholderText: string;
  type: string;
  background?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  width = '29.5rem',
  height = '3.4375rem',
  placeholderText,
  type,
  background,
  value,
  onChange,
}: IInput) => (
  <S.Input
    id={id}
    width={width}
    height={height}
    placeholder={placeholderText}
    type={type}
    background={background}
    value={value}
    onChange={onChange}
  />
);

export default Input;
