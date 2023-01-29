import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import PatchCommentModal from './PatchCommentModal';

import { deleteComment } from '@/apis/comment';
import { Icons } from '@/assets/icons';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_DELETE_COMMENT } from '@/constants/code';
import useModal from '@/hooks/useModal';
import { queryClient } from '@/index';
import { CommentType } from '@/interfaces/Comments';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

interface PatchCommentListProps {
  mapHostId: number;
  placeId: number;
  content: CommentType[];
}

const PatchCommentList = ({
  mapHostId,
  placeId,
  content,
}: PatchCommentListProps) => {
  const user = useRecoilValue(userState);

  const [comment, setComment] = useState({ commentId: 0, content: '' });

  const {
    isModal: isDeleteOkModal,
    setIsModal: setIsDeleteOkModal,
    modalText: deleteOkModalText,
    setModalText: setDeleteOkModalText,
  } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const {
    isModal: isPatchModal,
    setIsModal: setIsPatchModal,
    modalText: patchModalText,
  } = useModal({
    title: '댓글이 성공적으로 수정되었습니다.',
    description: '댓글 수정',
    buttonText: '확인',
    handleButtonClick: () => {
      setIsPatchModal(false);
      queryClient.invalidateQueries(['PlaceDetail', placeId]);
      return true;
    },
  });

  const fetchDeleteComment = useMutation(
    (commentId: number) => deleteComment(commentId),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_COMMENT) {
          setDeleteOkModalText({
            title: '댓글이 성공적으로 삭제되었습니다.',
            description: '댓글 삭제',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsDeleteOkModal(false);
              queryClient.invalidateQueries(['PlaceDetail', placeId]);
              return true;
            },
          });
          setIsDeleteOkModal(true);
        }
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    }
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <Text text="한 줄 댓글들" size="small" color={theme.color.gray} />
        <div className="w-[16.125rem] h-[7.5rem] flex flex-col gap-4 overflow-y-auto">
          {content.length === 0 ? (
            <div>등록된 댓글이 없습니다.</div>
          ) : (
            content.map(c => (
              <div
                className="flex justify-between items-center"
                key={`comment-${c.comment_id}`}
              >
                <div className="flex flex-col gap-1">
                  <img
                    className="w-4 h-4 rounded-full"
                    src={c.member_profile_image}
                    alt="comment profile"
                  />
                  <span className="w-12 text-xs text-gray truncate">
                    {c.member_nickname}
                  </span>
                </div>
                <p>{c.content}</p>
                {mapHostId === user?.member_id && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setComment({
                          commentId: c.comment_id,
                          content: c.content,
                        });
                        setIsPatchModal(true);
                      }}
                    >
                      <Icon
                        size="small"
                        url={Icons.CommentEdit}
                        alt="수정아이콘"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteOkModalText({
                          title: '댓글을 삭제하시겠습니까?.',
                          description: '삭제한 댓글은 복구가 불가능합니다.',
                          buttonText: '확인',
                          handleButtonClick: () => {
                            setIsDeleteOkModal(false);
                            fetchDeleteComment.mutate(c.comment_id);
                            return true;
                          },
                        });
                        setIsDeleteOkModal(true);
                      }}
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
      {isDeleteOkModal && (
        <GlobalModal
          size="xSmall"
          handleCancelClick={() => setIsDeleteOkModal(false)}
        >
          <ModalContent
            title={deleteOkModalText.title}
            description={deleteOkModalText.description}
            buttonText={deleteOkModalText.buttonText}
            handleButtonClick={deleteOkModalText.handleButtonClick}
          />
        </GlobalModal>
      )}
      {isPatchModal && (
        <GlobalModal
          size="xSmall"
          handleCancelClick={() => setIsPatchModal(false)}
        >
          <PatchCommentModal
            comment={comment}
            setComment={setComment}
            patchModalText={patchModalText}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default PatchCommentList;
