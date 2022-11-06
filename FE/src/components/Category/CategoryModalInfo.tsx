import { useState } from 'react';

import * as S from './CategoryModalInfo.style';

import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { CategoryColors } from '@/constants/colors';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

const CategoryModalInfo = ({ stories, mapData, placeInfo }: any) => {
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    color: '',
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, description: e.target.value });
  };

  const handleColorClick = (color: string) => {
    setCategoryFormData({ ...categoryFormData, color });
  };

  const checkDupliCateColor = (color: string) => {
    const existColors = mapData.categorized_places.map(
      (category: any) => category.color
    );
    if (existColors.includes(color)) return true;
    return false;
  };

  const isExistName = () => {
    const existName = mapData.categorized_places.map(
      (category: any) => category.name
    );
    if (existName.includes(categoryFormData.name)) return true;
    return false;
  };

  const isExistBgColor = () => {
    const existColors = mapData.categorized_places.map(
      (category: any) => category.color
    );
    if (existColors.includes(categoryFormData.color)) return true;
    return false;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isExistName() || isExistBgColor()) {
      // 간단한 popup창 띄우기.
    }
    // 통과되면 장소 생성 api 호출.
    const newPlace = {
      name: placeInfo.place_name,
      address: placeInfo.address_name,
      lat: placeInfo.x,
      lng: placeInfo.y,
      stories,
      map_id: mapData.map_id,
      category_id: null,
      category_name: categoryFormData.name,
      category_color: categoryFormData.color,
      category_description: categoryFormData.description,
    };
  };

  return (
    <S.ModalInfoWrapper>
      <S.Header>
        <S.Title>
          {`${unicodeToEmoji(mapData.map_emoji)} ${mapData.map_name}`}
          <br />
        </S.Title>
        <S.SubTitle>지도에서 사용중인 카테고리 현재 목록</S.SubTitle>
      </S.Header>
      <S.Buttons>
        {mapData.categorized_places.map((category: any) => (
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
          <S.Label htmlFor="name">카테고리명</S.Label>
          <Input
            id="name"
            width="15rem"
            height="2.5rem"
            placeholderText="카테고리 이름"
            color={theme.color.placeholder}
            background={theme.color.inputBackground}
            type="text"
            value={categoryFormData.name}
            onChange={handleNameChange}
          />
          {isExistName() && (
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
            <Text text="장소 생성" size="regular" color={theme.color.white} />
          </Button>
        </S.ButtonBox>
      </S.Form>
    </S.ModalInfoWrapper>
  );
};

export default CategoryModalInfo;
