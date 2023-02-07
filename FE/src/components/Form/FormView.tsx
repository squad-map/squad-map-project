import styled from '@emotion/styled';

import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import { flexbox } from '@/styles/mixin';
import theme from '@/styles/theme';

const Label = styled.label`
  color: ${theme.color.lightGray};
  font-size: 20px;
  font-weight: bold;
`;

const ColumnBox = styled.div`
  width: 19rem;
  ${flexbox({ dir: 'column' })}
  gap: 1rem;
  margin: 1rem 0;
`;

interface FormViewProps {
  mapId?: string;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: {
    title: string;
    description: string;
    buttonText: string;
    handleButtonClick: () => void;
  };
  handleSubmit: (
    e: React.SyntheticEvent<HTMLButtonElement>,
    paramId?: string,
    method?: string
  ) => void;
  formData: {
    map_name: string;
    map_emoji: string;
    authority: boolean;
  };
  handleMapNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmojiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthorityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormView = ({
  mapId,
  isModal,
  setIsModal,
  modalText,
  handleSubmit,
  formData,
  handleMapNameChange,
  handleEmojiChange,
  handleAuthorityChange,
}: FormViewProps) => (
  <>
    <form className="flex flex-col items-center" data-testid="map_form">
      <ColumnBox>
        <Label htmlFor="map_name">지도명</Label>
        <Input
          id="map_name"
          width="19rem"
          height="2.5rem"
          placeholderText="코드스쿼드 주변 맛집"
          background={theme.color.inputBackground}
          type="text"
          value={formData.map_name}
          onChange={handleMapNameChange}
        />
      </ColumnBox>
      <ColumnBox>
        <Label htmlFor="map_emoji">이모지</Label>
        <Input
          id="map_emoji"
          width="19rem"
          height="2.5rem"
          placeholderText="&#x1f6a7; 과 같은 이모지 입력"
          background={theme.color.inputBackground}
          type="text"
          value={formData.map_emoji}
          onChange={handleEmojiChange}
        />
      </ColumnBox>
      <ColumnBox>
        <Text
          text="지도 공개 설정"
          size="large"
          color={theme.color.lightGray}
        />
        <div className="flex justify-between px-6">
          <label className="flex items-start" htmlFor="public">
            <input
              className="mr-2"
              type="radio"
              name="authority"
              id="public"
              value="true"
              defaultChecked
              onChange={handleAuthorityChange}
            />
            Public
          </label>

          <label className="flex items-start" htmlFor="group">
            <input
              className="mr-2"
              type="radio"
              name="authority"
              id="group"
              value="false"
              onChange={handleAuthorityChange}
            />
            Group
          </label>
        </div>
      </ColumnBox>

      {mapId ? (
        <div className="flex gap-4 mt-8">
          <Button
            type="submit"
            size="regular"
            color={theme.color.darkBlue}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e, mapId, 'patch')
            }
          >
            <Text text="수정하기" size="regular" color="#fff" />
          </Button>
          <Button
            size="regular"
            color={theme.color.darkRed}
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e, mapId, 'delete')
            }
          >
            <Text text="삭제하기" size="regular" color="#fff" />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="submit"
            size="large"
            color="#000"
            onClick={(e: React.SyntheticEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
          >
            <Text text="생성하기" size="xRegular" color="#fff" />
          </Button>
        </div>
      )}
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
