import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { postComment } from '@/apis/comment';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import KakaoStaticMap from '@/components/KaKaoMap/KakaoStaticMap';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_POST_COMMENT } from '@/constants/code';
import { PlaceDetail } from '@/interfaces/Place';
import theme from '@/styles/theme';

const PlaceModalComment = ({ placeInfo }: { placeInfo: PlaceDetail }) => {
  // 기존 placeInfo 데이터에 이미 해당 장소에 대한 댓글들이 존재한다.
  // 댓글을 작성하면 placeInfo 데이터도 업데이트 해야한다. -> 상위 컴포넌트 getPlaceDeatilInfo 함수 부분을 useMutation으로 수정후 refetch 함수를 전달받도록 수정하자.

  const { id } = useParams();
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

  const handleCreatecomment = () => {
    if (comment === '') {
      setModalText({
        title: '리뷰를 입력해주세요.',
        description: '리뷰를 채워주세요.',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }
    if (id) {
      fetchPostComment.mutate({ map_id: +id, place_id, content: comment });
    }
  };

  const handlecommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcomment(e.target.value);
  };

  return (
    <>
      <div className="w-[27.5rem] h-full flex flex-col justify-between items-center gap-4 py-6">
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-lg">{placeInfo.place_name}</h1>
          <p className="text-md text-darkGray">{placeInfo.address}</p>
        </header>
        <KakaoStaticMap placeInfo={placeInfo} />
        {/*  리뷰 작성 Form */}
        <article className="w-full flex gap-4">
          <form className="flex flex-col gap-4">
            <Text
              text="한 줄 리뷰 작성"
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
            <Text text="한 줄 리뷰들" size="small" color={theme.color.gray} />
            {content.length === 0 ? (
              <div>등록된 리뷰가 없습니다.</div>
            ) : (
              content.map(c => <div>{c.content}</div>)
            )}
          </div>
        </article>
        <div>
          <Button
            size="small"
            color={theme.color.yellow}
            onClick={handleCreatecomment}
          >
            <Text text="리뷰 등록" size="small" color={theme.color.label} />
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
