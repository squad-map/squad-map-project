import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import * as S from './GroupInfo.style';

import { getGroupMembers, putGroupMember, deleteGroupMember } from '@/apis/group';
import Popup from '@/components/common/Popup'
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface GroupInfoRespnse {
  member_id: number;
  member_nickname: string;
  member_profile_image: string;
  permission_level: string;
}

const GroupInfo = ({ mapId }: { mapId: number }) => {
  const [permission, setPermission] = useState("READ");
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [buttonFlag, setButtonFlag] = useState(0);

  const [isPopup, setIsPopup] = useState(false);
  const queryClient = useQueryClient();

  const { data: groupMembers, refetch } = useQuery(['GroupInfo'], () => {
    if (mapId) {
      return getGroupMembers(mapId);
    }
    return true;
  });

  const fetchDeleteGroup = useMutation(({ deleteMapId, groupDeleteBody }: {
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
    });

  const fetchPutGroup = useMutation(({ putMapId, groupPutBody }: {
    putMapId: number;
    groupPutBody: { member_id: number, permission_level: string };
  }) => putGroupMember(putMapId, groupPutBody),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries('GroupInfo');
      },
      onError: (error: unknown) => {
        throw new Error(`error is ${error}`);
      },
    });

  console.log(groupMembers);

  const handleButtonClick = (memberId: number, flag: number) => {
    // flag: 0 : 수정, 1: 삭제
    setButtonFlag(flag);
    setSelectedMemberId(memberId);
    setIsPopup(true);
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermission(e.target.value);
  }

  const handleSubmitClick = () => {
    if (!selectedMemberId) return;
    console.log(permission);
    if (buttonFlag === 0) fetchPutGroup.mutate({ putMapId: mapId, groupPutBody: { member_id: selectedMemberId, permission_level: permission } })
    else if (buttonFlag === 1) fetchDeleteGroup.mutate({ deleteMapId: mapId, groupDeleteBody: { member_id: selectedMemberId } })
    refetch();
    setIsPopup(false);
  }

  return (
    <>
      <S.GroupInfoWrapper>
        {groupMembers ? (
          <>
            {groupMembers.map((member: GroupInfoRespnse) => (
              <S.GroupInfo key={member.member_id}>
                <S.ProfileImage src={member.member_profile_image} />
                <Text
                  text={member.member_nickname}
                  size="xSmall"
                  color={theme.color.black}
                />
                {member.permission_level === "HOST" ?
                  <Text
                    text={member.permission_level}
                    size="xSmall"
                    color={theme.color.black}
                  />
                  :
                  <S.SearchSelectBox onChange={handleSelectChange}>
                    <S.SearchOption value="READ" selected={member.permission_level === "READ"}>READ</S.SearchOption>
                    <S.SearchOption value="MAINTAIN" selected={member.permission_level === "MAINTAIN"}>MAINTAIN</S.SearchOption>
                  </S.SearchSelectBox>
                }
                <S.Button bgColor={theme.color.navy} onClick={() => handleButtonClick(member.member_id, 0)}>
                  <Text text="수정" size="xSmall" color={theme.color.black} />
                </S.Button>
                <S.Button bgColor={theme.color.lightRed} onClick={() => handleButtonClick(member.member_id, 1)}>
                  <Text text="삭제" size="xSmall" color={theme.color.black} />
                </S.Button>
              </S.GroupInfo>
            ))}
          </>
        ) : (
          <div>No Group Data</div>
        )}
      </S.GroupInfoWrapper>
      {isPopup && <Popup handleSubmitClick={handleSubmitClick} handleCancelClick={() => setIsPopup(false)}><Text text={buttonFlag === 0 ? "수정하시겠습니까?" : "삭제하시겠습니까?"} size="small" color={theme.color.black} /></Popup>}
    </>
  );
};

export default GroupInfo;
