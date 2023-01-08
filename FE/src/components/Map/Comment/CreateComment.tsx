import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { postComment } from '@/apis/comment';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_POST_COMMENT } from '@/constants/code';
import { UseGetMapId } from '@/hooks/UseGetMapId';
import theme from '@/styles/theme';

interface CreateCommentProps {
  placeId: number;
  placeDetailRefetch: () => void;
}

const CreateComment = ({ placeId, placeDetailRefetch }: CreateCommentProps) => {
  const mapId = UseGetMapId();
  const [comment, setComment] = useState('');
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
            placeDetailRefetch();
            setComment('');
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
      placeId,
      content: comment,
    });
  };
  const handlecommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <>
      <form className="flex flex-col gap-4">
        <Text text="한 줄 댓글 작성" size="small" color={theme.color.gray} />
        <textarea
          className="w-[13.125rem] h-[7.5rem] p-4 rounded-2xl bg-inputBackground resize-none"
          maxLength={100}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handlecommentChange(e)
          }
        />
        <div>
          <Button
            type="button"
            size="small"
            color={theme.color.yellow}
            onClick={handleCreatecomment}
          >
            <Text text="댓글 등록" size="small" color={theme.color.label} />
          </Button>
        </div>
      </form>
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

export default CreateComment;
