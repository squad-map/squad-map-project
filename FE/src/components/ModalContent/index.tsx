interface ModalContentProps {
  title: string;
  description?: string;
  handleButtonClick: () => void;
  buttonText: string;
}

const ModalContent = ({
  title,
  description,
  buttonText,
  handleButtonClick,
}: ModalContentProps) => (
  <div className="h-full flex flex-col justify-between items-center gap-8 pt-16 pb-8">
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-xl font-bold">{title}</h1>
      {description && <span className="text-xs text-label">{description}</span>}
    </div>
    <button
      type="button"
      className="w-64 h-12 rounded-lg bg-blue text-white"
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  </div>
);

export default ModalContent;
