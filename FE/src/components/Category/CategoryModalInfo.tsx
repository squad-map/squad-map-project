import { useState } from 'react';

import { HeaderProps } from '../../pages/MyMap/Header';

import * as S from './CategoryModalInfo.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { CategoryColors } from '@/constants/colors';
import theme from '@/styles/theme';

const CategoryModalInfo = ({ headerData }: HeaderProps) => {
  const [categoryFormData, setCategoryFormData] = useState({
    title: '',
    description: '',
    color: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, description: e.target.value });
  };

  const handleColorClick = (color: string) => {
    setCategoryFormData({ ...categoryFormData, color });
  };

  const checkDupliCateColor = (color: string) => {
    const existColors = headerData.categories.map(category => category.color);
    if (existColors.includes(color)) return true;
    return false;
  };

  const isExistTitle = () => {
    const existTitle = headerData.categories.map(category => category.name);
    if (existTitle.includes(categoryFormData.title)) return true;
    return false;
  };

  const isExistBgColor = () => {
    const existColors = headerData.categories.map(category => category.color);
    if (existColors.includes(categoryFormData.color)) return true;
    return false;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isExistTitle() || isExistBgColor()) {
      // 간단한 popup창 띄우기.
    }
    // 통과되면 카테고리 생성 api 호출.
  };

  return (
    <S.ModalInfoWrapper>
      <S.Header>
        <S.Title>
          {headerData.title}
          <br />
        </S.Title>
        <S.SubTitle>지도에서 사용중인 카테고리 현재 목록</S.SubTitle>
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
          {isExistTitle() && (
            <Text
              text="중복되는 카테고리 이름입니다."
              size="xSmall"
              color={theme.color.red}
            />
          )}
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
            {CategoryColors.map(
              color =>
                !checkDupliCateColor(color) && (
                  <S.ColorCircle
                    type="button"
                    color={color}
                    onClick={() => handleColorClick(color)}
                  />
                )
            )}
          </S.ColorBox>
        </S.ColumnBox>

        <S.ButtonBox>
          <Button
            type="submit"
            size="regular"
            color={theme.color.black}
            onClick={(e: React.SyntheticEvent<HTMLFormElement>) =>
              handleSubmit(e)
            }
          >
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
