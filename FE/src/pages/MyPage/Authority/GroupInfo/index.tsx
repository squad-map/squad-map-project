import { useQuery } from '@tanstack/react-query';

import * as S from './GroupInfo.style';

import { getGroupMembers } from '@/apis/group';
import Text from '@/components/common/Text';
import theme from '@/styles/theme';

interface GroupInfoRespnse {
  member_id: number;
  member_nickname: string;
  member_profile_image: string;
  permission_level: string;
}

const GroupInfo = ({ mapId }: { mapId: number }) => {
  const { data: groupMembers } = useQuery(['groupInfo'], () => {
    if (mapId) {
      return getGroupMembers(mapId);
    }
    return true;
  });

  console.log(groupMembers);

  return (
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
              <Text
                text={member.permission_level}
                size="xSmall"
                color={theme.color.black}
              />
              <S.Button bgColor={theme.color.navy}>
                <Text text="수정" size="xSmall" color={theme.color.black} />
              </S.Button>
              <S.Button bgColor={theme.color.lightRed}>
                <Text text="삭제" size="xSmall" color={theme.color.black} />
              </S.Button>
            </S.GroupInfo>
          ))}
        </>
      ) : (
        <div>No Group Data</div>
      )}
    </S.GroupInfoWrapper>
  );
};

export default GroupInfo;
