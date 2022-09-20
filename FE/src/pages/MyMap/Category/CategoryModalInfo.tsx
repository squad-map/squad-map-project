import { useState } from 'react';

import { HeaderProps } from '../Header';

import * as S from './CategoryModalInfo.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import theme from '@/styles/theme';

const CategoryModalInfo = ({ headerData }: HeaderProps) => {
  const [categoryFormData, setCategoryFormData] = useState({
    title: '',
    description: '',
    color: '',
  });

  const [isColorPopup, setIsColorPopup] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, description: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') e.target.value = '#';
    setCategoryFormData({ ...categoryFormData, color: e.target.value });
  };

  const handleColorPopup = () => {
    setIsColorPopup(true);
  };

  const handleRandomBgColor = () => {
    // TODO: 10가지 색상 정한 후 randomColor 해당 컬러중 랜덤으로 돌리도록 리팩토링
    const randomColor = new Array(3).fill(0).reduce((prev: string) => {
      // eslint-disable-next-line no-param-reassign
      prev += Math.floor(Math.random() * 127 + 128)
        .toString(16)
        .toUpperCase();
      return prev;
    }, '#');

    setCategoryFormData({ ...categoryFormData, color: randomColor });
  };

  return (
    <S.ModalInfoWrapper>
      <S.Header>
        <S.Title>
          {headerData.title}
          <br />
        </S.Title>
        <S.SubTitle>카테고리 현재 목록</S.SubTitle>
      </S.Header>
      <S.Buttons>
        {headerData.categories.map(category => (
          <Button size="xSmall" color={category.color}>
            <Text
              text={category.name}
              size="xSmall"
              color={theme.color.white}
            />
          </Button>
        ))}
      </S.Buttons>
      <S.Suffix>
        <Icon size="small" url={Icons.Exclamation} alt="카테고리 추가 문구" />
        <Text
          text="카테고리를 추가 할 수 있습니다. (최대 10개)"
          size="xSmall"
          color={theme.color.gray}
        />
      </S.Suffix>
      <S.Form>
        <S.ColumnBox>
          <S.Label htmlFor="title">카테고리명</S.Label>
          <Input
            id="title"
            width="15rem"
            height="2.5rem"
            placeholderText="카테고리 이름"
            color={theme.color.placeholder}
            background={theme.color.inputBackground}
            type="text"
            value={categoryFormData.title}
            onChange={handleTitleChange}
          />
        </S.ColumnBox>
        <S.ColumnBox>
          <S.Label htmlFor="description">카테고리 설명</S.Label>
          <Input
            id="description"
            width="15rem"
            height="2.5rem"
            placeholderText="설명(선택)"
            color={theme.color.placeholder}
            background={theme.color.inputBackground}
            type="text"
            onChange={handleDescriptionChange}
          />
        </S.ColumnBox>
        <S.ColumnBox>
          <S.Label htmlFor="color">카테고리 색상</S.Label>
          <S.ColorBox>
            <input
              id="color"
              width="15rem"
              height="2.5rem"
              placeholder="배경색상"
              color={theme.color.placeholder}
              type="text"
              value={categoryFormData.color}
              onClick={handleColorPopup}
              onChange={handleColorChange}
              maxLength={7}
            />
            <S.RefreshButton type="button" onClick={handleRandomBgColor}>
              <Icon size="small" url={Icons.Refresh} alt="배경 랜덤 색상" />
            </S.RefreshButton>
          </S.ColorBox>
        </S.ColumnBox>

        <S.ButtonBox>
          <Button type="submit" size="regular" color={theme.color.black}>
            <Text
              text="카테고리 생성"
              size="regular"
              color={theme.color.white}
            />
          </Button>
        </S.ButtonBox>
      </S.Form>
    </S.ModalInfoWrapper>
  );
};

export default CategoryModalInfo;
