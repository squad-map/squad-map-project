import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import GlobalModal from '../common/GlobalModal';
import ModalContent from '../ModalContent';

import NickNameView from './NickNameView';

import { patchNickName } from '@/apis/user';
import { SUCCESS_NICKNAME_UPDATE } from '@/constants/code';
import useModal from '@/hooks/useModal';
import { userState } from '@/recoil/atoms/user';

interface NickNameProps {
  handleCancelClick: () => void;
}

const NickName = ({ handleCancelClick }: NickNameProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [nickName, setNickName] = useState(user?.nickname || '');

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const fetchPatchNickName = useMutation(
    (updatedNickName: string) => patchNickName(updatedNickName),
    {
      onSuccess: ({
        code,
        data,
      }: {
        code: string;
        data: { member_id: number; nickname: string };
      }) => {
        if (code === SUCCESS_NICKNAME_UPDATE) {
          setModalText({
            title: '닉네임이 변경되었습니다.',
            description: '닉네임 변경 성공',
            buttonText: '닫기',
            handleButtonClick: () => {
              setUser({
                ...user,
                member_id: data.member_id,
                nickname: data.nickname,
              });
              handleCancelClick();
            },
          });
          setIsModal(true);
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const handleUpdatedNickName = async () => {
    fetchPatchNickName.mutate(nickName);
  };

  return (
    <>
      <NickNameView
        nickName={nickName}
        handleNickNameChange={handleNickNameChange}
        handleUpdatedNickName={handleUpdatedNickName}
      />
      {isModal && (
        <GlobalModal size="small" handleCancelClick={() => setIsModal(false)}>
          <ModalContent
            title={modalText.title}
            description={modalText.description}
            handleButtonClick={modalText.handleButtonClick}
            buttonText={modalText.buttonText}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default NickName;
