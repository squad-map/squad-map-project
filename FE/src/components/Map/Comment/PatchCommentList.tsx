import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { deleteComment } from '@/apis/comment';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_DELETE_COMMENT } from '@/constants/code';
import { CommentType } from '@/interfaces/Comments';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface PatchCommentListProps {
  mapHostId: number;
  content: CommentType[];
}

const PatchCommentList = ({ mapHostId, content }: PatchCommentListProps) => {
  const user = useRecoilValue(userState);
  const [comment, setComment] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isPatchModal, setIsPatchModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchDeleteComment = useMutation(
    (commentId: number) => deleteComment(commentId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_COMMENT) {
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

  const handlePatchComment = (currentContent: string) => {
    setComment(currentContent);
    setIsPatchModal(true);
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <>
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
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handlePatchComment(c.content)}
                    >
                      <Icon
                        size="small"
                        url={Icons.CommentEdit}
                        alt="수정아이콘"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(c.comment_id)}
                    >
                      <Icon size="small" url={Icons.Trash} alt="삭제아이콘" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
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
      {isPatchModal && (
        <GlobalModal
          size="xSmall"
          handleCancelClick={() => setIsPatchModal(false)}
        >
          <div>
            <h1>댓글 수정하기</h1>
            <Input
              id="map_emoji"
              width="10rem"
              height="2rem"
              placeholderText="댓글 입력"
              background={theme.color.inputBackground}
              type="text"
              value={comment}
              onChange={handleCommentChange}
            />
            <Button type="button" size="small" color={theme.color.navy}>
              <Text text="댓글 수정" size="small" color={theme.color.white} />
            </Button>
          </div>
        </GlobalModal>
      )}
    </>
  );
};

export default PatchCommentList;
