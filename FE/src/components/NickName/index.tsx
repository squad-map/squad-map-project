import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import * as S from './NickName.style';

import { postNickName } from '@/apis/user';
import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface NickNameProps {
  handleCancelClick: () => void;
}

const NickName = ({ handleCancelClick }: NickNameProps) => {
  const [nickName, setNickName] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const fetchPostNickName = useMutation(
    (updatedNickName: string) => postNickName(updatedNickName),
    {
      onSuccess: (data: { nickname: string }) => {
        if (data) {
          setUser({ nickname: data.nickname });
        }
      },
    }
  );

  useEffect(() => {
    if (user?.nickname) {
      setNickName(user.nickname);
    }
  }, [user]);

  const handleUpdatedNickName = async () => {
    fetchPostNickName.mutate(nickName);
    handleCancelClick();
  };

  return (
    <S.NickNameWrapper>
      <S.Title>닉네임 변경</S.Title>
      <Image url={Images.LoginBackground} alt="Login Background" />
      <Input
        id="nickname"
        width="19rem"
        height="2.5rem"
        placeholderText="변경할 닉네임을 입력해주세요."
        color={theme.color.placeholder}
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
    </S.NickNameWrapper>
  );
};

export default NickName;
