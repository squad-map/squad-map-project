import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import {
  getGroupMembers,
  putGroupMember,
  deleteGroupMember,
} from '@/apis/group';
import Popup from '@/components/common/Popup';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface GroupInfoRespnse {
  member_id: number;
  member_nickname: string;
  member_profile_image: string;
  permission_level: string;
}

const GroupInfo = ({ mapId }: { mapId: number }) => {
  const [permission, setPermission] = useState('READ');
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(0);

  const [isPopup, setIsPopup] = useState(false);

  const { data: groupMembers, refetch } = useQuery(['GroupInfo'], () => {
    if (mapId) {
      return getGroupMembers(mapId);
    }
    return true;
  });

  const fetchDeleteGroup = useMutation(
    ({
      deleteMapId,
      groupDeleteBody,
    }: {
      deleteMapId: number;
      groupDeleteBody: { selectedMemberId: number };
    }) => deleteGroupMember(deleteMapId, groupDeleteBody),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries('GroupInfo');
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
      onSuccess: () => {
        // queryClient.invalidateQueries('GroupInfo');
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
        groupDeleteBody: { member_id: selectedMemberId },
      });
    refetch();
    setIsPopup(false);
  };

  return (
    <>
      <article className="h-40 my-4 overflow-y-auto">
        {groupMembers ? (
          <>
            {groupMembers.map((member: GroupInfoRespnse) => (
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
                {member.permission_level === 'HOST' ? (
                  <Text
                    text={member.permission_level}
                    size="xSmall"
                    color={theme.color.black}
                  />
                ) : (
                  <select
                    className="w-20 rounded-2xl p-1 border-[1px] border-solid border-black cursor-pointer"
                    onChange={handleSelectChange}
                  >
                    <option
                      value="READ"
                      selected={member.permission_level === 'READ'}
                    >
                      READ
                    </option>
                    <option
                      value="MAINTAIN"
                      selected={member.permission_level === 'MAINTAIN'}
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
                  className="w-12 h-6 roundd-2xl bg-lightRed"
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
