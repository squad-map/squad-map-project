import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteComment, postComment } from '@/apis/comment';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_POST_COMMENT } from '@/constants/code';
import { UseGetMapId } from '@/hooks/UseGetMapId';
import { PlaceDetail } from '@/interfaces/Place';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface PlaceModalComment {
  mapHostId: number;
  placeInfo: PlaceDetail;
}

const PlaceModalComment = ({ mapHostId, placeInfo }: PlaceModalComment) => {
  // 기존 placeInfo 데이터에 이미 해당 장소에 대한 댓글들이 존재한다.
  // 댓글을 작성하면 placeInfo 데이터도 업데이트 해야한다. -> 상위 컴포넌트 getPlaceDeatil 함수 부분을 useMutation으로 수정후 refetch 함수를 전달받도록 수정하자.
  const mapId = UseGetMapId();
  const {
    place_id,
    comments: { content },
  } = placeInfo;

  const [comment, setcomment] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });
  const user = useRecoilValue(userState);

  const fetchPostComment = useMutation(postComment, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_POST_COMMENT) {
        setModalText({
          title: '댓글이 등록되었습니다.',
          description: '댓글 등록 완료',
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

  const fetchDeleteComment = useMutation(
    (commentId: number) => deleteComment(commentId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === 'SM-S04') {
          setModalText({
            title: '댓글이 성공적으로 삭제되었습니다.',
            description: '댓글 삭제',
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
    }
  );

  const handleCreatecomment = () => {
    if (comment === '') {
      setModalText({
        title: '댓글를 입력해주세요.',
        description: '댓글를 채워주세요.',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }

    fetchPostComment.mutate({
      mapId,
      placeId: place_id,
      content: comment,
    });
  };

  const handlecommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcomment(e.target.value);
  };

  const handleDeleteComment = (commentId: number) => {
    setModalText({
      title: '댓글을 삭제하시겠습니까?.',
      description: '삭제한 댓글은 복구가 불가능합니다.',
      buttonText: '확인',
      handleButtonClick: () => {
        setIsModal(false);
        fetchDeleteComment.mutate(commentId);
        return true;
      },
    });
    setIsModal(true);
  };

  return (
    <>
      <div className="w-[27.5rem] h-full flex flex-col justify-between items-center gap-4 py-6">
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-lg">{placeInfo.place_name}</h1>
          <p className="text-md text-darkGray">{placeInfo.address}</p>
        </header>
        <KakaoStaticMap placeInfo={placeInfo} />
        {/*  댓글 작성 Form */}
        <article className="w-full flex gap-4">
          <form className="flex flex-col gap-4">
            <Text
              text="한 줄 댓글 작성"
              size="small"
              color={theme.color.gray}
            />
            <textarea
              className="w-[13.125rem] h-[7.5rem] p-4 rounded-2xl bg-inputBackground resize-none"
              maxLength={100}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handlecommentChange(e)
              }
            />
          </form>
          <div className="flex flex-col gap-4">
            <Text text="한 줄 댓글들" size="small" color={theme.color.gray} />
            <div className="w-[13.125rem] h-[7.5rem] flex flex-col gap-4 overflow-y-auto">
              {content.length === 0 ? (
                <div>등록된 댓글이 없습니다.</div>
              ) : (
                content.map(c => (
                  <div className="flex justify-between">
                    <p>{c.content}</p>
                    {mapHostId === user?.member_id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(c.comment_id)}
                      >
                        <Icon size="small" url={Icons.Trash} alt="삭제아이콘" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
        <div>
          <Button
            size="small"
            color={theme.color.yellow}
            onClick={handleCreatecomment}
          >
            <Text text="댓글 등록" size="small" color={theme.color.label} />
          </Button>
        </div>
        <Button size="xLarge" color={theme.color.yellow}>
          <Text
            text="카카오맵으로 자세히 보기"
            size="regular"
            color={theme.color.lightBlack}
          />
        </Button>
      </div>
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

export default PlaceModalComment;
