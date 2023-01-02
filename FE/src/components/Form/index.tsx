import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Form.style';

import { postMypage, patchMypage, deleteMypage } from '@/apis/mypage';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import {
  SUCCESS_POST_MAP,
  SUCCESS_PATCH_MAP,
  SUCCESS_DELETE_MAP,
} from '@/constants/code';
import theme from '@/styles/theme';
import { MypagePostParams, MypagePatchParams } from '@/types/mypage';
import { emojiToUnicode } from '@/utils/util';

interface FormProps {
  mapId?: string;
  state?: MypagePatchParams;
  type: boolean;
}

const Form = ({ mapId, state, type }: FormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    map_name: state?.map_name || '',
    map_emoji: state?.map_emoji || '',
    authority: true,
  });

  const fetchPostMypage = useMutation(postMypage, {
    onSuccess: ({ code, data }: { code: string; data: { map_id: number } }) => {
      if (code === SUCCESS_POST_MAP) {
        queryClient.invalidateQueries('mypageData');
        // 성공 popup 띄우기.
        navigate(`/map/${data.map_id}`);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const fetchPatchMypage = useMutation(
    ({
      paramId,
      mypageRequestBody,
    }: {
      paramId: number;
      mypageRequestBody: MypagePostParams;
    }) => patchMypage(paramId, mypageRequestBody),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_PATCH_MAP) {
          queryClient.invalidateQueries('mypageData');
          navigate('/mypage');
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  const fetchDeleteMypage = useMutation(
    (paramId: number) => deleteMypage(paramId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_MAP) {
          queryClient.invalidateQueries('mypageData');
          navigate('/mypage');
        }
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
    setFormData({ ...formData, map_emoji: e.target.value });
  };

  const handleAuthorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFormData({ ...formData, authority: id === 'public' });
  };

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    paramId?: string,
    method?: string
  ) => {
    // 여기서 post, patch, delete 모두 다뤄야하나?
    e.preventDefault();
    const newMypage = {
      map_name: formData.map_name,
      map_emoji: emojiToUnicode(formData.map_emoji),
      full_disclosure: formData.authority,
    };

    if (paramId) {
      if (method === 'patch')
        fetchPatchMypage.mutate({ paramId, mypageRequestBody: newMypage });
      else if (method === 'delete') fetchDeleteMypage.mutate(paramId);
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
        <S.Label htmlFor="map_emoji">이모지</S.Label>
        <Input
          id="map_emoji"
          width="19rem"
          height="2.5rem"
          placeholderText="&#x1f6a7; 과 같은 이모지 입력"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          value={formData.map_emoji}
          onChange={handleEmojiChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <Text
          text="지도 공개 설정"
          size="large"
          color={theme.color.lightGray}
        />
        <div className="flex justify-between px-6">
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
        </div>
      </S.ColumnBox>

      {type ? (
        <S.ButtonWrapper>
          <Button
            type="submit"
            size="regular"
            color={theme.color.darkBlue}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e, mapId, 'patch')
            }
          >
            <Text text="수정하기" size="regular" color="#fff" />
          </Button>
          <Button
            size="regular"
            color={theme.color.darkRed}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e, mapId, 'delete')
            }
          >
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
