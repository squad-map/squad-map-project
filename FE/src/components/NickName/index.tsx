import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import LoadingSpinner from '../common/LoadingSpinner';

import { patchNickName } from '@/apis/user';
import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import { SUCCESS_NICKNAME_UPDATE } from '@/constants/code';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface NickNameProps {
  handleCancelClick: () => void;
}

const NickName = ({ handleCancelClick }: NickNameProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [nickName, setNickName] = useState(user?.nickname);

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
          setUser({ member_id: data.member_id, nickname: data.nickname });
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const handleUpdatedNickName = async () => {
    fetchPatchNickName.mutate(nickName);
    handleCancelClick();
  };

  return (
    <section className="flex flex-col items-center gap-6 mt-12">
      <h2 className="text-2xl">닉네임 변경</h2>
      {fetchPatchNickName.isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <>
          <Image url={Images.LoginBackground} alt="Login Background" />
          <Input
            id="nickname"
            width="20rem"
            height="2rem"
            placeholderText="변경할 닉네임을 입력해주세요."
            background={theme.color.inputBackground}
            type="text"
            value={nickName}
            onChange={handleNickNameChange}
          />
          <Button
            size="regular"
            color={theme.color.blue}
            onClick={handleUpdatedNickName}
          >
            <Text text="변경하기" size="small" color={theme.color.white} />
          </Button>
        </>
      )}
    </section>
  );
};

export default NickName;
