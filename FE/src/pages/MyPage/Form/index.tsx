import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Form.style';

import { postMypage, patchMypage } from '@/apis/mypage';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';
import { MypagePostParams } from '@/types/mypage';
import { emojiToUnicode } from '@/utils/util';

interface FormProps {
  formId?: number;
  type: string;
}

const Form = ({ formId, type }: FormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    map_name: '',
    emoji: '',
    share: 'do',
    authority: true,
  });

  const fetchPostMypage = useMutation(postMypage, {
    onSuccess: (data: { map_id: number }) => {
      if (data.map_id) {
        queryClient.invalidateQueries('mypageData');
        // 성공 popup 띄우기.
        navigate(-1);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const fetchPatchMypage = useMutation(
    ({
      patchId,
      mypageRequestBody,
    }: {
      patchId: number;
      mypageRequestBody: MypagePostParams;
    }) => patchMypage(patchId, mypageRequestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('mypageData');
        navigate(-1);
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const handleMapNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, map_name: e.target.value });
  };

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emoji: e.target.value });
  };

  const handleAuthorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFormData({ ...formData, authority: id === 'public' });
  };

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    patchId?: number
  ) => {
    e.preventDefault();
    const newMypage = {
      map_name: formData.map_name,
      emoji: emojiToUnicode(formData.emoji),
      full_disclosure: formData.authority,
    };

    if (patchId) {
      fetchPatchMypage.mutate({ patchId, newMypage });
    } else {
      fetchPostMypage.mutate(newMypage);
    }
  };

  return (
    <S.Form data-testid="map_form">
      <S.ColumnBox>
        <S.Label htmlFor="map_name">지도명</S.Label>
        <Input
          id="map_name"
          width="19rem"
          height="2.5rem"
          placeholderText="코드스쿼드 주변 맛집"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          value={formData.map_name}
          onChange={handleMapNameChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <S.Label htmlFor="emoji">이모지</S.Label>
        <Input
          id="emoji"
          width="19rem"
          height="2.5rem"
          placeholderText="&#x1f6a7; 과 같은 이모지 입력"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          value={formData.emoji}
          onChange={handleEmojiChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <Text
          text="지도 공개 설정"
          size="large"
          color={theme.color.lightGray}
        />
        <S.RadioBox>
          <label htmlFor="public">
            <input
              type="radio"
              name="authority"
              id="public"
              value="true"
              defaultChecked
              onChange={handleAuthorityChange}
            />
            Public
          </label>

          <label htmlFor="group">
            <input
              type="radio"
              name="authority"
              id="group"
              value="false"
              onChange={handleAuthorityChange}
            />
            Group
          </label>
        </S.RadioBox>
      </S.ColumnBox>

      {type === 'modify' ? (
        <S.ButtonWrapper>
          <Button
            type="submit"
            size="regular"
            color={theme.color.darkBlue}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e, formId)
            }
          >
            <Text text="수정하기" size="regular" color="#fff" />
          </Button>
          <Button size="regular" color={theme.color.darkRed}>
            <Text text="삭제하기" size="regular" color="#fff" />
          </Button>
        </S.ButtonWrapper>
      ) : (
        <S.ButtonWrapper>
          <Button
            type="submit"
            size="large"
            color="#000"
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
          >
            <Text text="생성하기" size="xRegular" color="#fff" />
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Form>
  );
};

export default Form;
