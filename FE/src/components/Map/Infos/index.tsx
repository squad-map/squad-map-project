import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import PlaceModalComment from '../PlaceModalComment';
import PlaceModalUpdate from '../PlaceModalUpdate';

import { getMapCategories } from '@/apis/category';
import { deletePlace, getPlaceDeatil } from '@/apis/place';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import UserProfile from '@/components/UserProfile';
import {
  SUCCESS_DELETE_PLACE,
  SUCCESS_GET_CATEGORIES,
  SUCCESS_GET_PLACE,
} from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import { CommentsType } from '@/interfaces/Comments';
import { PlaceDetail } from '@/interfaces/Place';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';
import { CategorizedPlaces, MapUserType, PlaceType } from '@/types/map';

interface InfosProps {
  mapHostId: number;
  infoData: CategorizedPlaces[];
  userProfile: MapUserType;
  refetchMap: () => void;
}

const Infos = ({
  mapHostId,
  infoData,
  userProfile,
  refetchMap,
}: InfosProps) => {
  const mapId = useGetMapId();
  const [modalParams, setModalParams] = useState({
    type: 'GET',
    placeId: 0,
    modal: false,
  });
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });
  const [placeDetail, setPlaceDetail] = useState({
    place_id: 0,
    place_name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    story: '',
    detail_link: '',
    category_id: 0,
    comments: [] as unknown as CommentsType,
  });

  const user = useRecoilValue(userState);

  const { data: mapCategory, isLoading: categoryLoading } = useQuery(
    ['MapCategory', mapId],
    () => getMapCategories(mapId)
  );

  const { refetch: placeDetailRefetch } = useQuery(
    ['PlaceDetail', modalParams.placeId],
    () => {
      if (!modalParams.placeId) return;
      // eslint-disable-next-line consistent-return
      return getPlaceDeatil({ mapId, placeId: modalParams.placeId });
    },
    {
      onSuccess: ({ code, data }: { code: string; data: PlaceDetail }) => {
        if (code === SUCCESS_GET_PLACE) {
          setPlaceDetail(data);
        }
      },
    }
  );

  const handleClickPlace = async (
    type: 'COMMENT' | 'UPDATE',
    placeId: number
  ) => {
    setModalParams({ type, placeId, modal: true });
  };

  const fetchDeletePlace = useMutation(
    (placeId: number) => deletePlace(mapId, placeId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_PLACE) {
          setModalText({
            title: '지도가 성공적으로 삭제되었습니다.',
            description: '지도 삭제',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              refetchMap();
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
      title: '지도를 삭제하시겠습니까?.',
      description: '삭제한 지도는 복구가 불가능합니다.',
      buttonText: '확인',
      handleButtonClick: () => {
        setIsModal(false);
        fetchDeletePlace.mutate(placeId);
        return true;
      },
    });
    setIsModal(true);
  };

  if (!categoryLoading && mapCategory.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (categoryLoading) {
    return <LoadingSpinner size="medium" />;
  }

  return (
    infoData && (
      <section className="flex flex-col gap-4 max-h-[38rem] mt-8 p-1 absolute right-4 z-[999]">
        <Button size="large" color={theme.color.navy}>
          <Text size="large" text="🍞 Muffin" color={theme.color.white} />
        </Button>
        {infoData &&
          infoData.map((info: CategorizedPlaces) =>
            info.places.map((place: PlaceType) => (
              <Card
                size="large"
                key={`InfoCard-${place.place_id}`}
                color={theme.color.white}
              >
                <div className="h-full flex flex-col gap-8">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        size="xSmall"
                        color={info.category_info.category_color}
                        key={`categoryButton-${info.category_info.category_name}`}
                      >
                        <Text
                          size="xSmall"
                          text={info.category_info.category_name}
                          color={theme.color.white}
                        />
                      </Button>
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
              </Card>
            ))
          )}
        {placeDetail && modalParams.modal && modalParams.type === 'COMMENT' && (
          <GlobalModal
            size="large"
            handleCancelClick={() =>
              setModalParams({ ...modalParams, modal: false })
            }
          >
            <PlaceModalComment
              mapHostId={mapHostId}
              placeInfo={placeDetail}
              placeDetailRefetch={placeDetailRefetch}
            />
          </GlobalModal>
        )}
        {placeDetail && modalParams.modal && modalParams.type === 'UPDATE' && (
          <GlobalModal
            size="medium"
            handleCancelClick={() =>
              setModalParams({ ...modalParams, modal: false })
            }
          >
            <PlaceModalUpdate
              placeInfo={placeDetail}
              categoryInfo={mapCategory.data}
              setIsOpenUpdateModal={() =>
                setModalParams({ ...modalParams, modal: false })
              }
              refetchMap={refetchMap}
            />
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
