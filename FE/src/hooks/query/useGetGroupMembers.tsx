import { useQuery } from '@tanstack/react-query';

import { getGroupMembers } from '@/apis/group';

interface useGetGroupMembersProps {
  mapId: number;
}

const useGetGroupMembers = ({ mapId }: useGetGroupMembersProps) => {
  const { groupMembers, groupMembersLoading } = useQuery(
    ['GroupMembers', mapId],
    () => {
      if (mapId) {
        return getGroupMembers(mapId);
      }
      return true;
    }
  );
  return { groupMembers, groupMembersLoading };
};

export default useGetGroupMembers;
