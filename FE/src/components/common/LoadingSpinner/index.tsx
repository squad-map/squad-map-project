import * as S from './LoadingSpinner.style';

interface ILoadingSpinner {
  size: string;
}

const LoadingSpinner = ({ size = 'small' }: ILoadingSpinner) => (
  <S.LoadingSpinner size={size} />
);

export default LoadingSpinner;
