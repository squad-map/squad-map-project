import { useState } from 'react';

interface useModalProps {
  title: string;
  description: string;
  buttonText: string;
  handleButtonClick: () => void;
}

const useModal = ({
  title,
  description,
  buttonText,
  handleButtonClick,
}: useModalProps) => {
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title,
    description,
    buttonText,
    handleButtonClick,
  });

  return { isModal, setIsModal, modalText, setModalText };
};

export default useModal;
