import { useQuery } from '@tanstack/react-query';

import GroupInfo from '../../Authority/GroupInfo';
import SearchForm from '../../Authority/SearchForm';

import { getGroupMembers } from '@/apis/group';
import Text from '@/components/common/Text';
import { SUCCESS_GET_GROUP_MEMBERS } from '@/constants/code';
import { GroupMember } from '@/interfaces/group';
import theme from '@/styles/theme';

interface AuthorityProps {
  mapId: number;
  handleCancelClick: () => void;
}

const Authority = ({ mapId, handleCancelClick }: AuthorityProps) => {
  const { data: groupMembers, refetch: refetchGorupMembers } = useQuery(
    ['GroupInfo'],
    () => {
      if (mapId) {
        return getGroupMembers(mapId);
      }
      return true;
    }
  );

  if (groupMembers && groupMembers.code !== SUCCESS_GET_GROUP_MEMBERS)
    return <div>API Error</div>;

  return (
    <section
      aria-hidden="true"
      className="flex flex-col items-center mt-8"
      onClick={e => e.preventDefault()}
    >
      <Text
        text="Group Permission Management"
        className="h-6"
        size="xRegularFill"
        color={theme.color.black}
      />
      {groupMembers && (
        <GroupInfo
          mapId={mapId}
          groupMembers={groupMembers.data}
          refetchGorupMembers={refetchGorupMembers}
        />
      )}
      {groupMembers && (
        <SearchForm
          mapId={mapId}
          handleCancelClick={handleCancelClick}
          groupMembers={groupMembers.data.map(
            (member: GroupMember) => member.member_nickname
          )}
        />
      )}
    </section>
  );
};

export default Authority;
