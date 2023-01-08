import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import UserProfile from '@/components/UserProfile';
import {
  SUCCESS_DELETE_PLACE,
  SUCCESS_GET_CATEGORIES,
  SUCCESS_GET_PLACE,
} from '@/constants/code';
import { UseGetMapId } from '@/hooks/UseGetMapId';
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
  const mapId = UseGetMapId();
  const [modalParams, setModalParams] = useState({ type: 'GET', placeId: 0 });
  const [isOpenComment, setIsOpenCommentModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const user = useRecoilValue(userState);

  const { data: mapCategory } = useQuery(['MapCategory', mapId], () =>
    getMapCategories(mapId)
  );

  const { data: placeDetail, refetch: placeDetailRefetch } = useQuery(
    ['PlaceDetail'],
    () => getPlaceDeatil({ mapId, placeId: modalParams.placeId }),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_GET_PLACE) {
          if (modalParams.type === 'GET') {
            setIsOpenCommentModal(true);
          } else if (modalParams.type === 'UPDATE') {
            setIsOpenUpdateModal(true);
          }
        }
      },
    }
  );

  const handleClickPlace = async (type: 'GET' | 'UPDATE', placeId: number) => {
    setModalParams({ type, placeId });
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

  if (mapCategory && mapCategory.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    placeDetailRefetch();
  }, [modalParams, placeDetailRefetch]);

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
                        onClick={() => handleClickPlace('GET', place.place_id)}
                      />
                    </div>
                    {mapHostId === user?.member_id && (
                      <div className="flex gap-4">
                        <Button
                          size="xSmall"
                          color={theme.color.navy}
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
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
        {isOpenComment && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenCommentModal(false)}
          >
            <PlaceModalComment
              mapHostId={mapHostId}
              placeInfo={placeDetail.data}
              placeDetailRefetch={placeDetailRefetch}
            />
          </GlobalModal>
        )}
        {isOpenUpdateModal && (
          <GlobalModal
            size="medium"
            handleCancelClick={() => setIsOpenUpdateModal(false)}
          >
            <PlaceModalUpdate
              placeInfo={placeDetail.data}
              categoryInfo={mapCategory.data}
              setIsOpenUpdateModal={setIsOpenUpdateModal}
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
