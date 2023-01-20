import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { patchComment } from '@/apis/comment';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { SUCCESS_PATCH_COMMENT } from '@/constants/code';
import theme from '@/styles/theme';

interface PatchCommentModalProps {
  comment: { commentId: number; content: string };
  setComment: React.Dispatch<
    React.SetStateAction<{
      commentId: number;
      content: string;
    }>
  >;
  patchModalText: {
    title: string;
    description: string;
    buttonText: string;
    handleButtonClick: () => void;
  };
}

const PatchCommentModal = ({
  comment,
  setComment,
  patchModalText,
}: PatchCommentModalProps) => {
  const [isModal, setIsModal] = useState(false);

  const fetchPatchComment = useMutation(patchComment, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_PATCH_COMMENT) {
        setIsModal(true);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({ ...comment, content: e.target.value });
  };

  const handlePatchComment = () => {
    fetchPatchComment.mutate(comment);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between items-center p-12">
        <h1 className="text-2xl text-navy mb-8">댓글 수정하기</h1>
        <div className="flex flex-col gap-2">
          <span className="text-lightGray">댓글</span>
          <Input
            id="map_emoji"
            width="15rem"
            height="2rem"
            placeholderText="댓글 입력"
            background={theme.color.inputBackground}
            type="text"
            value={comment.content}
            onChange={handleCommentChange}
          />
        </div>
        <Button
          type="button"
          size="small"
          color={theme.color.navy}
          onClick={handlePatchComment}
        >
          <Text text="댓글 수정" size="small" color={theme.color.white} />
        </Button>
      </div>
      {isModal && (
        <GlobalModal size="xSmall" handleCancelClick={() => setIsModal(false)}>
          <ModalContent
            title={patchModalText.title}
            description={patchModalText.description}
            buttonText={patchModalText.buttonText}
            handleButtonClick={patchModalText.handleButtonClick}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default PatchCommentModal;
