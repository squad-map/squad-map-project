import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { putGroupMember, deleteGroupMember } from '@/apis/group';
import GlobalModal from '@/components/common/GlobalModal';
import Popup from '@/components/common/Popup';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  SUCCESS_DELETE_GROUP_MEMBER,
  SUCCESS_PUT_GROUP_MEMBER,
} from '@/constants/code';
import { GroupMember } from '@/interfaces/group';
import { userState } from '@/recoil/atoms/user';
import theme from '@/styles/theme';

const GroupInfo = ({
  mapId,
  groupMembers,
  refetchGroupMembers,
}: {
  mapId: number;
  groupMembers: GroupMember[];
  refetchGroupMembers: () => void;
}) => {
  const [permission, setPermission] = useState('READ');
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(0);

  const [isPopup, setIsPopup] = useState(false);
  const user = useRecoilValue(userState);

  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchDeleteGroup = useMutation(
    ({ deleteMapId, member_id }: { deleteMapId: number; member_id: number }) =>
      deleteGroupMember(deleteMapId, member_id),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_DELETE_GROUP_MEMBER) {
          setModalText({
            title: '그룹이 삭제 되었습니다.',
            description: '그룹 삭제 완료',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              refetchGroupMembers();
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

  const fetchPutGroup = useMutation(
    ({
      putMapId,
      groupPutBody,
    }: {
      putMapId: number;
      groupPutBody: { member_id: number; permission_level: string };
    }) => putGroupMember(putMapId, groupPutBody),
    {
      onSuccess: ({ code }: { code: string }) => {
        if (code === SUCCESS_PUT_GROUP_MEMBER) {
          setModalText({
            title: '그룹이 수정 되었습니다.',
            description: '그룹 수정 완료',
            buttonText: '확인',
            handleButtonClick: () => {
              setIsModal(false);
              refetchGroupMembers();
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

  const handleButtonClick = (memberId: number, flag: number) => {
    // flag: 0 : 수정, 1: 삭제
    setButtonFlag(flag);
    setSelectedMemberId(memberId);
    setIsPopup(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermission(e.target.value);
  };

  const handleSubmitClick = () => {
    if (!selectedMemberId) return;
    if (buttonFlag === 0)
      fetchPutGroup.mutate({
        putMapId: mapId,
        groupPutBody: {
          member_id: selectedMemberId,
          permission_level: permission,
        },
      });
    else if (buttonFlag === 1)
      fetchDeleteGroup.mutate({
        deleteMapId: mapId,
        member_id: selectedMemberId,
      });
    refetchGroupMembers();
    setIsPopup(false);
  };

  return (
    <>
      <article className="h-40 my-4 overflow-y-auto">
        {groupMembers ? (
          <>
            {groupMembers.map((member: GroupMember) => (
              <div
                key={member.member_id}
                className="flex items-center gap-4 mb-2"
              >
                <img
                  className="w-6 h-6 rounded-2xl"
                  src={member.member_profile_image}
                  alt="Profile"
                />
                <Text
                  text={member.member_nickname}
                  size="xSmall"
                  color={theme.color.black}
                />
                {member.level === 'HOST' ? (
                  <Text
                    text={member.level}
                    size="xSmall"
                    color={theme.color.black}
                  />
                ) : (
                  <select
                    className="w-20 rounded-2xl p-1 border-[1px] border-solid border-black cursor-pointer"
                    onChange={handleSelectChange}
                  >
                    <option value="READ" selected={member.level === 'READ'}>
                      READ
                    </option>
                    <option
                      value="MAINTAIN"
                      selected={member.level === 'MAINTAIN'}
                    >
                      MAINTAIN
                    </option>
                  </select>
                )}
                {user && user.member_id !== member.member_id && (
                  <>
                    <button
                      type="button"
                      className="w-12 h-6 rounded-2xl bg-navy"
                      onClick={() => handleButtonClick(member.member_id, 0)}
                    >
                      <Text
                        text="수정"
                        size="xSmall"
                        color={theme.color.black}
                      />
                    </button>
                    <button
                      type="button"
                      className="w-12 h-6 rounded-2xl bg-lightRed"
                      onClick={() => handleButtonClick(member.member_id, 1)}
                    >
                      <Text
                        text="삭제"
                        size="xSmall"
                        color={theme.color.black}
                      />
                    </button>
                  </>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="mt-16">No Group Data</div>
        )}
      </article>
      {isPopup && (
        <Popup
          handleSubmitClick={handleSubmitClick}
          handleCancelClick={() => setIsPopup(false)}
        >
          <Text
            text={buttonFlag === 0 ? '수정하시겠습니까?' : '삭제하시겠습니까?'}
            size="small"
            color={theme.color.black}
          />
        </Popup>
      )}
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

export default GroupInfo;
