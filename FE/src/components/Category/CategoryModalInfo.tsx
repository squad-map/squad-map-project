import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import * as S from './CategoryModalInfo.style';

import { postCategory } from '@/apis/category';
import { postPlace } from '@/apis/place';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { CategoryColors } from '@/constants/colors';
import theme from '@/styles/theme';
import { unicodeToEmoji } from '@/utils/util';

const CategoryModalInfo = ({ story, mapData, placeInfo }: any) => {
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    color: '',
  });

  const fetchPostPlace = useMutation(postPlace, {
    onSuccess: (data: { place_id: number }) => {
      if (data.place_id) {
        // 팝업닫기.
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const fetchPostCategory = useMutation(postCategory, {
    onSuccess: (data: { category_id: number }) => {
      if (data.category_id) {
        const newPlace = {
          name: placeInfo.name,
          address: placeInfo.address,
          latitude: placeInfo.latitude,
          longitude: placeInfo.longitude,
          story,
          detail_link: placeInfo.detail_link,
          map_id: mapData.map_id,
          category_id: data.category_id,
        };
        fetchPostPlace.mutate(newPlace);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, name: e.target.value });
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

    // category create api 호출.
    const newCategory = {
      category_name: categoryFormData.name,
      color: categoryFormData.color,
      map_id: mapData.map_id,
      // category_description: categoryFormData.description,
    };

    fetchPostCategory.mutate(newCategory);
  };

  return (
    <S.ModalInfoWrapper>
      <S.Header>
        <S.Title>
          {`${unicodeToEmoji(mapData.map_emoji)} ${mapData.map_name}`}
          <br />
        </S.Title>
      </S.Header>
      <S.Suffix>
        <Icon size="small" url={Icons.Exclamation} alt="카테고리 추가 문구" />
        <Text
          text="카테고리를 추가 할 수 있습니다. (장소당 1개)"
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
            size="xRegular"
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
