import React, { useRef, useState } from 'react';

import * as S from './Form.style';

import { Icons } from '@/assets/icons';
import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import theme from '@/styles/theme';

interface FormProps {
  onForm: { create: boolean; modify: boolean };
}

const Form = ({ onForm }: FormProps) => {
  const dataId = useRef(1);
  const [shareForm, setShareForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    share: 'do',
    emails: [
      {
        dataId: dataId.current,
        component: (
          <S.EmailBox>
            <Input
              width="16rem"
              height="2.5rem"
              placeholderText="jinlog9@gmail.com"
              color={theme.color.placeholder}
              background={theme.color.inputBackground}
              type="text"
            />
            <Icon
              size="medium"
              url={Icons.Minus}
              alt="이메일 삭제 버튼"
              data-id={dataId.current}
              cursor
            />
          </S.EmailBox>
        ),
      },
    ],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emoji: e.target.value });
  };

  const handleMinusEmail = (e: React.MouseEvent<HTMLImageElement>) => {
    // 해당 id만 객체에서 뺴주기
    const ImageTarget = e.target as HTMLImageElement;

    if (ImageTarget.tagName === 'IMG') {
      setFormData({
        ...formData,
        emails: formData.emails.filter(email =>
          email.dataId.toString() !== ImageTarget.dataset.id ? email : ''
        ),
      });
    }
  };

  const handleAddEmail = () => {
    dataId.current += 1;
    const newFormData = {
      ...formData,
      emails: [
        ...formData.emails,
        {
          dataId: dataId.current,
          component: (
            <S.EmailBox>
              <Input
                width="16rem"
                height="2.5rem"
                placeholderText="jinlog9@gmail.com"
                color={theme.color.placeholder}
                background={theme.color.inputBackground}
                type="text"
              />
              <Icon
                size="medium"
                url={Icons.Minus}
                alt="이메일 삭제 버튼"
                cursor
                data-id={dataId.current}
              />
            </S.EmailBox>
          ),
        },
      ],
    };

    setFormData(newFormData);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFormData({ ...formData, share: id });

    if (id === 'do') {
      setShareForm(true);
    } else {
      setShareForm(false);
    }
  };

  return (
    <S.Form>
      <S.ColumnBox>
        <S.Label>지도명</S.Label>
        <Input
          width="19rem"
          height="2.5rem"
          placeholderText="코드스쿼드 주변 맛집"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          onChange={handleNameChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <S.Label>아이콘</S.Label>
        <Input
          width="19rem"
          height="2.5rem"
          placeholderText="🍖 과 같은 이모지 입력"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          onChange={handleEmojiChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <Text
          text="지도를 다른 사람들과 공유할건가요?"
          size="large"
          color={theme.color.lightGray}
        />
        <S.RadioBox>
          <label htmlFor="do">
            <input
              type="radio"
              name="share"
              id="do"
              value="true"
              defaultChecked
              onChange={handleRadioChange}
            />
            공유
          </label>

          <label htmlFor="dont">
            <input
              type="radio"
              name="share"
              id="dont"
              value="false"
              onChange={handleRadioChange}
            />
            공유하지않음
          </label>
        </S.RadioBox>
      </S.ColumnBox>
      {shareForm && (
        <S.ColumnBox>
          <S.ShareBox onClick={handleMinusEmail}>
            {formData.emails.map(element => element.component)}
          </S.ShareBox>
          <S.EmailBox>
            <Image
              url={Images.PlusEmail}
              alt="Email Plus Button"
              cursor
              onClick={handleAddEmail}
            />
          </S.EmailBox>
        </S.ColumnBox>
      )}

      {onForm.modify ? (
        <>
          <S.ButtonWrapper>
            <Button size="large" color="#000">
              <Text text="수정하기" size="xRegular" color="#fff" />
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button size="large" color="#000">
              <Text text="삭제하기" size="xRegular" color="#fff" />
            </Button>
          </S.ButtonWrapper>
        </>
      ) : (
        <S.ButtonWrapper>
          <Button size="large" color="#000">
            <Text text="생성하기" size="xRegular" color="#fff" />
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Form>
  );
};

export default Form;
