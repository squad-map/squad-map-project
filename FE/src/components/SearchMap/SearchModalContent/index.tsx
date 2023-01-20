import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postPlace } from '@/apis/place';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import ModalContent from '@/components/ModalContent';
import { FAIL_DUPLICATE, SUCCESS_POST_PLACE } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import useModal from '@/hooks/useModal';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';
import { PlaceType } from '@/types/map';

interface SearchModalContentprops {
  placeInfo: PlaceType;
  mapCategory: CategoryType[];
}

const SearchModalContent = ({
  placeInfo,
  mapCategory,
}: SearchModalContentprops) => {
  const mapId = useGetMapId();
  const navigate = useNavigate();
  const [placeForm, setPlaceForm] = useState({
    story: '',
    category_id: 0,
    color: '',
  });

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchPostPlace = useMutation(postPlace, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_POST_PLACE) {
        setModalText({
          title: '장소가 생성되었습니다.',
          description: '장소 생성 성공',
          buttonText: '이동',
          handleButtonClick: () => {
            setIsModal(false);
            navigate(`/map/${mapId}`);
            return true;
          },
        });
        setIsModal(true);
      } else if (code === FAIL_DUPLICATE) {
        setModalText({
          title: '장소 생성 실패.',
          description: '이미 등록된 장소입니다.',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
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

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlaceForm({ ...placeForm, story: e.target.value });
  };

  const handleColorClick = (category_id: number, color: string) => {
    setPlaceForm({ ...placeForm, category_id, color });
  };

  const handleCreatePlace = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newPlace = {
      name: placeInfo.place_name,
      address: placeInfo.address,
      latitude: placeInfo.latitude,
      longitude: placeInfo.longitude,
      story: placeForm.story,
      detail_link: placeInfo.detail_link,
      category_id: placeForm.category_id,
    };

    if (!newPlace.category_id) {
      setModalText({
        title: '카테고리를 먼저 생성해주세요.',
        description: '장소 생성 실패',
        buttonText: '닫기',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      return setIsModal(true);
    }

    return fetchPostPlace.mutate({ mapId, placePostParams: newPlace });
  };

  return (
    <>
      <section className="h-full flex flex-col gap-4 items-center p-8">
        <h1 className="text-2xl">{placeInfo.place_name}</h1>
        <KakaoStaticMap placeInfo={placeInfo} />
        <form className="flex flex-col gap-2">
          <textarea
            placeholder="당신의 이야기를 들려주세요."
            value={placeForm.story}
            className="w-full h-52 p-4 resize-none rounded-2xl bg-inputBackground"
            onChange={handleStoryChange}
          />
          <div className="flex flex-col gap-4 mb-2">
            <span className="text-lightGray">카테고리 색상</span>
            <div className="flex flex-wrap gap-2">
              {mapCategory &&
                mapCategory.map((category: CategoryType) => (
                  <button
                    type="button"
                    aria-label="color-button"
                    style={{
                      backgroundColor: category.category_color,
                    }}
                    className="w-8 h-8 rounded-full hover:opactiy-80"
                    onClick={() =>
                      handleColorClick(
                        category.category_id,
                        category.category_color
                      )
                    }
                  />
                ))}
              {mapCategory && mapCategory.length === 0 && (
                <p className="text-xs">등록된 카테고리가 없습니다.</p>
              )}
            </div>
            <span className="text-lightGray">
              현재 선택된 카테고리 : {placeForm.color || '미선택'}
            </span>
          </div>
          <Button
            type="submit"
            size="xLarge"
            color={theme.color.darkNavy}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleCreatePlace(e)
            }
          >
            <Text text="장소 생성" size="regular" color={theme.color.white} />
          </Button>
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

export default SearchModalContent;
