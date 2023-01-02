import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { putGroupMember, deleteGroupMember } from '@/apis/group';
import Popup from '@/components/common/Popup';
import Text from '@/components/common/Text';
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
  refetchGorupMembers,
}: {
  mapId: number;
  groupMembers: GroupMember[];
  refetchGorupMembers: () => void;
}) => {
  const [permission, setPermission] = useState('READ');
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(0);

  const [isPopup, setIsPopup] = useState(false);
  const user = useRecoilValue(userState);

  const fetchDeleteGroup = useMutation(
    ({ deleteMapId, member_id }: { deleteMapId: number; member_id: number }) =>
      deleteGroupMember(deleteMapId, member_id),
    {
      onSuccess: ({ code }: { code: string }) => {
        // queryClient.invalidateQueries('GroupInfo');
        if (code === SUCCESS_DELETE_GROUP_MEMBER) {
          alert('성공적으로 삭제되었습니다.');
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
        // queryClient.invalidateQueries('GroupInfo');
        if (code === SUCCESS_PUT_GROUP_MEMBER) {
          alert('성공적으로 수정되었습니다.');
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
    refetchGorupMembers();
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

                <button
                  type="button"
                  className="w-12 h-6 rounded-2xl bg-navy"
                  onClick={() => handleButtonClick(member.member_id, 0)}
                >
                  <Text text="수정" size="xSmall" color={theme.color.black} />
                </button>
                <button
                  type="button"
                  className="w-12 h-6 rounded-2xl bg-lightRed"
                  onClick={() => handleButtonClick(member.member_id, 1)}
                >
                  <Text text="삭제" size="xSmall" color={theme.color.black} />
                </button>
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
    </>
  );
};

export default GroupInfo;
