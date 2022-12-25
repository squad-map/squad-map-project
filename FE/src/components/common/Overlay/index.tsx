interface OverlayProps {
  handleCancelClick: () => void;
}

const Overlay = ({ handleCancelClick }: OverlayProps) => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-[999] bg-black opacity-60"
    onClick={handleCancelClick}
  />
);

export default Overlay;
