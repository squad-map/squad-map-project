import styled from '@emotion/styled/macro';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postMypage, putMyPage, deleteMypage } from '@/apis/mypage';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  SUCCESS_POST_MAP,
  SUCCESS_PATCH_MAP,
  SUCCESS_DELETE_MAP,
} from '@/constants/code';
import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';
import { MypagePutParams } from '@/types/mypage';
import { emojiToUnicode } from '@/utils/util';

interface FormProps {
  mapId?: string;
  state?: MypagePutParams;
  type: boolean;
}

const Label = styled.label`
  color: ${theme.color.lightGray};
  font-size: 20px;
  font-weight: bold;
`;

const ColumnBox = styled.div`
  width: 19rem;
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
  margin: 1rem 0;
`;

const Form = ({ mapId, state, type }: FormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    map_name: state?.map_name || '',
    map_emoji: state?.map_emoji || '',
    authority: true,
  });

  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
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

    if (checkFormData()) {
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
        fetchPutMypage.mutate({ paramId, mypagePutParams: newMypage });
      } else if (method === 'delete') {
        fetchDeleteMypage.mutate(paramId);
      }
    } else {
      fetchPostMypage.mutate(newMypage);
    }
  };

  return (
    <>
      <form className="flex flex-col items-center" data-testid="map_form">
        <ColumnBox>
          <Label htmlFor="map_name">지도명</Label>
          <Input
            id="map_name"
            width="19rem"
            height="2.5rem"
            placeholderText="코드스쿼드 주변 맛집"
            background={theme.color.inputBackground}
            type="text"
            value={formData.map_name}
            onChange={handleMapNameChange}
          />
        </ColumnBox>
        <ColumnBox>
          <Label htmlFor="map_emoji">이모지</Label>
          <Input
            id="map_emoji"
            width="19rem"
            height="2.5rem"
            placeholderText="&#x1f6a7; 과 같은 이모지 입력"
            background={theme.color.inputBackground}
            type="text"
            value={formData.map_emoji}
            onChange={handleEmojiChange}
          />
        </ColumnBox>
        <ColumnBox>
          <Text
            text="지도 공개 설정"
            size="large"
            color={theme.color.lightGray}
          />
          <div className="flex justify-between px-6">
            <label className="flex items-start" htmlFor="public">
              <input
                className="mr-2"
                type="radio"
                name="authority"
                id="public"
                value="true"
                defaultChecked
                onChange={handleAuthorityChange}
              />
              Public
            </label>

            <label className="flex items-start" htmlFor="group">
              <input
                className="mr-2"
                type="radio"
                name="authority"
                id="group"
                value="false"
                onChange={handleAuthorityChange}
              />
              Group
            </label>
          </div>
        </ColumnBox>

        {type ? (
          <div className="flex gap-4 mt-8">
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
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </form>
      {isModal && (
        <GlobalModal size="xSmall" handleCancelClick={() => setIsModal(false)}>
          <ModalContent
            title={modalText.title}
            description={modalText.description}
            buttonText={modalText.buttonText}
            handleButtonClick={modalText.handleButtonClick}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default Form;
