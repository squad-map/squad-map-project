import * as S from './Overlay.style';

interface OverlayProps {
  handleCancelClick: () => void;
}

const Overlay = ({ handleCancelClick }: OverlayProps) => (
  <S.Overlay onClick={handleCancelClick} />
);

export default Overlay;
