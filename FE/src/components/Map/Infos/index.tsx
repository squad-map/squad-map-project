import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import PlaceModalComment from '../PlaceModalComment';
import PlaceModalUpdate from '../PlaceModalUpdate';

import { getMapCategories } from '@/apis/category';
import { deletePlace, getPlaceDeatil } from '@/apis/place';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import UserProfile from '@/components/UserProfile';
import { SUCCESS_DELETE_PLACE, SUCCESS_GET_CATEGORIES } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import useModal from '@/hooks/useModal';
import { queryClient } from '@/index';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';
import { MapUserType, PlaceType } from '@/types/map';

interface InfosProps {
  mapHostId: number;
  infoData: PlaceType[];
  userProfile: MapUserType;
  setCurrentCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const Infos = ({
  mapHostId,
  infoData,
  userProfile,
  setCurrentCoords,
}: InfosProps) => {
  const mapId = useGetMapId();
  const [modalParams, setModalParams] = useState({
    type: 'GET',
    placeId: 0,
    modal: false,
  });

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const user = useRecoilValue(userState);

  const { data: mapCategory, isLoading: categoryLoading } = useQuery(
    ['MapCategories', mapId],
    () => getMapCategories(mapId)
  );

  const { data: placeDetail } = useQuery(
    ['PlaceDetail', modalParams.placeId],
    () => {
      if (!modalParams.placeId) return true;
      return getPlaceDeatil({ mapId, placeId: modalParams.placeId });
    }
  );

  const handleClickPlace = async (
    type: 'COMMENT' | 'UPDATE',
    placeId: number
  ) => {
    // COMMENTT or UPDATE 관련 폼 클릭시 -> modalParams가 바꾸면서 useQuery 발동.
    setModalParams({ type, placeId, modal: true });
  };

  const fetchDeletePlace = useMutation(
    (placeId: number) => deletePlace(mapId, placeId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_PLACE) {
          setModalText({
            title: '장소가 성공적으로 삭제되었습니다.',
            description: '장소 삭제',
            buttonText: '확인',
            handleButtonClick: () => {
              queryClient.invalidateQueries(['Map', mapId]);
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
    }
  );

  const handleDeletePlace = (placeId: number) => {
    setModalText({
      title: '장소를 삭제하시겠습니까?.',
      description: '삭제한 장소는 복구가 불가능합니다.',
      buttonText: '확인',
      handleButtonClick: () => {
        setIsModal(false);
        fetchDeletePlace.mutate(placeId);
        return true;
      },
    });
    setIsModal(true);
  };

  const handleCardClick = (lat: number, lng: number) => {
    setCurrentCoords({ lat, lng });
  };

  if (!categoryLoading && mapCategory.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (categoryLoading) {
    return <LoadingSpinner size="medium" />;
  }

  return (
    infoData && (
      <section className="w-[21.25rem] flex flex-col gap-4 absolute top-36 right-8 z-[998]">
        <div className="h-[38rem] flex flex-col gap-4 overflow-y-auto">
          {infoData &&
            infoData.map((place: PlaceType) => (
              <div
                role="presentation"
                className="h-[15rem] p-4 bg-white rounded-2xl cursor-pointer shadow-xl hover:bg-silver transition-all duration-200"
                key={`InfoCard-${place.place_id}`}
                onClick={() => handleCardClick(place.latitude, place.longitude)}
              >
                <div className="h-full flex flex-col gap-8">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      {/* <Button
                        size="xSmall"
                        color={info.category_info.category_color}
                        key={`categoryButton-${info.category_info.category_name}`}
                      >
                        <Text
                          size="xSmall"
                          text={info.category_info.category_name}
                          color={theme.color.white}
                        />
                      </Button> */}
                      <Icon
                        size="small"
                        url={Icons.More}
                        alt="정보 더보기"
                        onClick={() =>
                          handleClickPlace('COMMENT', place.place_id)
                        }
                      />
                    </div>
                    {mapHostId === user?.member_id && (
                      <div className="flex gap-4">
                        <Button
                          size="xSmall"
                          color={theme.color.navy}
                          onClick={() => {
                            handleClickPlace('UPDATE', place.place_id);
                          }}
                        >
                          <Text
                            text="장소수정"
                            size="xSmall"
                            color={theme.color.white}
                          />
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlace(place.place_id)}
                        >
                          <Icon
                            size="small"
                            url={Icons.Trash}
                            alt="삭제아이콘"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <Text
                    size="xRegular"
                    text={place.place_name}
                    color={theme.color.lightGreen}
                  />
                  <Text
                    size="small"
                    text={place.address}
                    color={theme.color.gray}
                  />
                  <UserProfile userProfile={userProfile} />
                </div>
              </div>
            ))}
        </div>
        {placeDetail && modalParams.modal && modalParams.type === 'COMMENT' && (
          <GlobalModal
            size="xLarge"
            handleCancelClick={() =>
              setModalParams({ ...modalParams, modal: false })
            }
          >
            {placeDetail.data.place_id ? (
              <PlaceModalComment
                mapHostId={mapHostId}
                placeInfo={placeDetail.data}
              />
            ) : (
              <LoadingSpinner size="medium" />
            )}
          </GlobalModal>
        )}
        {placeDetail && modalParams.modal && modalParams.type === 'UPDATE' && (
          <GlobalModal
            size="medium"
            handleCancelClick={() =>
              setModalParams({ ...modalParams, modal: false })
            }
          >
            {placeDetail.data.place_id ? (
              <PlaceModalUpdate
                placeInfo={placeDetail.data}
                categoryInfo={mapCategory.data}
                setIsOpenUpdateModal={() =>
                  setModalParams({ ...modalParams, modal: false })
                }
              />
            ) : (
              <LoadingSpinner size="medium" />
            )}
          </GlobalModal>
        )}
        {isModal && (
          <GlobalModal
            size="xSmall"
            handleCancelClick={() => setIsModal(false)}
          >
            <ModalContent
              title={modalText.title}
              description={modalText.description}
              buttonText={modalText.buttonText}
              handleButtonClick={modalText.handleButtonClick}
            />
          </GlobalModal>
        )}
      </section>
    )
  );
};

export default Infos;
