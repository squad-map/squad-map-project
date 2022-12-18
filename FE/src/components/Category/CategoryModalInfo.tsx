import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ModalContent from '../ModalContent';

import { getMapCategories, postCategory } from '@/apis/category';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import Input from '@/components/Input';
import { CategoryColors } from '@/constants/colors';
import { HeaderProps } from '@/pages/Map/Header';
import theme from '@/styles/theme';
import { CategoryType } from '@/types/map';
import { unicodeToEmoji } from '@/utils/util';

interface CategoryModalInfoProps {
  headerData: HeaderProps;
  setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModalInfo = ({
  headerData,
  setIsCategoryModal,
}: CategoryModalInfoProps) => {
  // category_info가 아닌 getMapCategories API 호출을 통해 받아온 카테고리는 disabeld 처리
  const { map_id, category_info, emoji, title } = headerData;

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    color: '',
  });

  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const { data: mapCategory } = useQuery(['MapCategory'], () => {
    if (map_id) {
      return getMapCategories(map_id);
    }
    return true;
  });

  const fetchPostCategory = useMutation(postCategory, {
    onSuccess: (data: { category_id: number }) => {
      if (data.category_id) {
        setModalText({
          title: '카테고리가 등록되었습니다.',
          description: '카테고리 등록 완료',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            setIsCategoryModal(false);
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, name: e.target.value });
  };

  const handleColorClick = (color: string) => {
    setCategoryFormData({ ...categoryFormData, color });
  };

  const checkDupliCateColor = (color: string) => {
    const existColors = mapCategory.map(
      (category: CategoryType) => category.category_color
    );

    if (existColors.includes(color)) return true;
    return false;
  };

  const isExistName = () => {
    const existName = category_info.map(
      (category: CategoryType) => category.category_name
    );
    if (existName.includes(categoryFormData.name)) return true;
    return false;
  };

  const isExistBgColor = () => {
    const existColors = category_info.map(
      (category: CategoryType) => category.category_color
    );
    if (existColors.includes(categoryFormData.color)) return true;
    return false;
  };

  const handleCreateCategory = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryFormData.name || isExistName() || isExistBgColor()) {
      setModalText({
        title: '이름 또는 색상을 확인해주세요.',
        description: '카테고리 등록 실패',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }

    const newCategory = {
      category_name: categoryFormData.name,
      color: categoryFormData.color,
      map_id,
    };

    fetchPostCategory.mutate(newCategory);
  };

  return (
    <>
      <section className="h-full flex flex-col items-center justify-center">
        <header className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-2xl text-navy">
            {`${unicodeToEmoji(emoji)} ${title}`}
          </h1>
        </header>
        <div className="flex items-center gap-1 mb-8">
          <Icon size="small" url={Icons.Exclamation} alt="카테고리 추가 문구" />
          <Text
            text="카테고리를 추가 할 수 있습니다. (장소당 1개)"
            size="xSmall"
            color={theme.color.gray}
          />
        </div>
        <form className="flex flex-col items-center">
          <div className="w-60 flex flex-col gap-4 mb-8">
            <span className="text-lightGray">카테고리명</span>
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
          </div>
          <div className="w-60 flex flex-col gap-4 mb-8">
            <span className="text-lightGray">카테고리 색상</span>
            <div className="flex flex-wrap gap-2">
              {CategoryColors.map((color: string) => (
                <button
                  key={`category-${color}`}
                  type="button"
                  aria-label="color-button"
                  style={{
                    backgroundColor: color,
                  }}
                  className="w-8 h-8 rounded-full hover:opactiy-80"
                  onClick={() => handleColorClick(color)}
                  disabled={checkDupliCateColor(color)}
                />
              ))}
            </div>
            <span className="text-lightGray">
              현재 선택된 카테고리 : {categoryFormData.color || '미선택'}
            </span>
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              size="xRegular"
              color={theme.color.black}
              onClick={(e: React.SyntheticEvent<HTMLFormElement>) =>
                handleCreateCategory(e)
              }
            >
              <Text
                text="카테고리 생성"
                size="regular"
                color={theme.color.white}
              />
            </Button>
          </div>
        </form>
      </section>
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

export default CategoryModalInfo;
