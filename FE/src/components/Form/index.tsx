import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormView } from './FormView';

import { postMypage, putMyPage, deleteMypage } from '@/apis/mypage';
import {
  SUCCESS_POST_MAP,
  SUCCESS_PATCH_MAP,
  SUCCESS_DELETE_MAP,
} from '@/constants/code';
import useModal from '@/hooks/useModal';
import { MypagePutParams } from '@/types/mypage';
import { emojiToUnicode } from '@/utils/util';

interface FormProps {
  mapId?: string;
  state?: MypagePutParams;
}

const Form = ({ mapId, state }: FormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    map_name: state?.map_name || '',
    map_emoji: state?.map_emoji || '',
    authority: true,
  });

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '.',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const checkFormData = () => {
    if (formData.map_name === '' || formData.map_emoji === '') return true;
    return false;
  };

  const fetchPostMypage = useMutation(postMypage, {
    onSuccess: ({ code, data }: { code: string; data: { map_id: number } }) => {
      if (code === SUCCESS_POST_MAP) {
        setModalText({
          title: '지도가 생성되었습니다.',
          description: '지도 생성 성공',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            navigate(`/map/${data.map_id}`);
            return true;
          },
        });
        setIsModal(true);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const fetchPutMypage = useMutation(putMyPage, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_PATCH_MAP) {
        setModalText({
          title: '지도가 성공적으로 수정되었습니다.',
          description: '지도 수정 성공',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            navigate('/mypage');
            return true;
          },
        });
        setIsModal(true);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const fetchDeleteMypage = useMutation(
    (paramId: number) => deleteMypage(paramId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_MAP) {
          setModalText({
            title: '지도가 성공적으로 삭제되었습니다.',
            description: '지도 수정 삭제',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              navigate('/mypage');
              return true;
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

    if (method !== 'delete' && checkFormData()) {
      setModalText({
        title: '지도 이름/이모지를 입력해주세요.',
        description: '지도 이름 또는 이모지 확인',
        buttonText: '확인',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }

    if (paramId) {
      if (method === 'patch') {
        fetchPutMypage.mutate({ patchId: paramId, mypagePutParams: newMypage });
      } else if (method === 'delete') {
        fetchDeleteMypage.mutate(paramId);
      }
    } else {
      fetchPostMypage.mutate(newMypage);
    }
  };

  return (
    <FormView
      mapId={mapId}
      isModal={isModal}
      setIsModal={setIsModal}
      modalText={modalText}
      handleSubmit={handleSubmit}
      formData={formData}
      handleMapNameChange={handleMapNameChange}
      handleEmojiChange={handleEmojiChange}
      handleAuthorityChange={handleAuthorityChange}
    />
  );
};

export default Form;
