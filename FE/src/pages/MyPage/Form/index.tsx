import React, { useRef, useState } from 'react';

import EmailBox from './EmailBox';
import * as S from './Form.style';

import { Images } from '@/assets/images';
import Button from '@/components/common/Button';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { IMyMap } from '@/interfaces/IMyMap';
import theme from '@/styles/theme';
import { ButtonClickEventHandler } from '@/types/eventHandler';

interface FormProps {
  type: { create: boolean; modify: boolean };
  myPageData: IMyMap;
}

const Form = ({ type, myPageData }: FormProps) => {
  const dataId = useRef(1);
  const [isShareForm, setIsShareForm] = useState(true);

  const [formData, setFormData] = useState({
    title: myPageData.title || '',
    emoji: myPageData.emoji || '',
    share: 'do',
    emails: [] as string[],
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emails: [...formData.emails, e.target.value] });
  };

  const [emailComponent, setEmailComponent] = useState([
    {
      dataId: dataId.current,
      component: (
        <EmailBox
          dataId={dataId.current}
          handleEmailChange={handleEmailChange}
        />
      ),
    },
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, emoji: e.target.value });
  };

  const handleMinusEmail = (e: React.MouseEvent<HTMLImageElement>) => {
    // 해당 id만 객체에서 뺴주기
    const ImageTarget = e.target as HTMLImageElement;

    if (ImageTarget.tagName === 'IMG') {
      const filteredEmailComponent = emailComponent.filter(email =>
        email.dataId.toString() !== ImageTarget.dataset.id ? email : ''
      );
      setEmailComponent(filteredEmailComponent);
    }
  };

  const handleAddEmail = () => {
    dataId.current += 1;
    const newEmailComponent = [
      ...emailComponent,
      {
        dataId: dataId.current,
        component: (
          <EmailBox
            dataId={dataId.current}
            handleEmailChange={handleEmailChange}
          />
        ),
      },
    ];

    setEmailComponent(newEmailComponent);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setFormData({ ...formData, share: id });

    if (id === 'do') {
      setIsShareForm(true);
    } else {
      setIsShareForm(false);
    }
  };

  const handleCreateButton = (e: ButtonClickEventHandler) => {
    // e.preventDefault();
    console.log(formData);
  };
  const handleModifyButton = () => {};
  const handleDeleteButton = () => {};

  return (
    <S.Form>
      <S.ColumnBox>
        <S.Label htmlFor="title">지도명</S.Label>
        <Input
          id="title"
          width="19rem"
          height="2.5rem"
          placeholderText="코드스쿼드 주변 맛집"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
        />
      </S.ColumnBox>
      <S.ColumnBox>
        <S.Label htmlFor="emoji">이모지</S.Label>
        <Input
          id="emoji"
          width="19rem"
          height="2.5rem"
          placeholderText="🍖 과 같은 이모지 입력"
          color={theme.color.placeholder}
          background={theme.color.inputBackground}
          type="text"
          value={formData.emoji}
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
      {isShareForm && (
        <S.ColumnBox>
          <S.ShareBox onClick={handleMinusEmail}>
            {emailComponent.map(element => element.component)}
          </S.ShareBox>
          <Image
            url={Images.PlusEmail}
            alt="Email Plus Button"
            cursor
            onClick={handleAddEmail}
          />
        </S.ColumnBox>
      )}

      {type.modify ? (
        <S.ButtonWrapper>
          <Button
            size="regular"
            color={theme.color.darkBlue}
            onClick={handleModifyButton}
          >
            <Text text="수정하기" size="regular" color="#fff" />
          </Button>
          <Button
            size="regular"
            color={theme.color.darkRed}
            onClick={handleDeleteButton}
          >
            <Text text="삭제하기" size="regular" color="#fff" />
          </Button>
        </S.ButtonWrapper>
      ) : (
        <S.ButtonWrapper>
          <Button size="large" color="#000" onClick={handleCreateButton}>
            <Text text="생성하기" size="xRegular" color="#fff" />
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Form>
  );
};

export default Form;
