import { useQuery } from '@tanstack/react-query';

import AuthorityView from './AuthorityView';

import { getGroupMembers } from '@/apis/group';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { SUCCESS_GET_GROUP_MEMBERS } from '@/constants/code';

interface AuthorityProps {
  mapId: number;
}

const Authority = ({ mapId }: AuthorityProps) => {
  const { data: groupMembers, isLoading: groupMembersLoading } = useQuery(
    ['GroupMembers', mapId],
    () => {
      if (mapId) {
        return getGroupMembers(mapId);
      }
      return true;
    }
  );

  if (!groupMembersLoading && groupMembers.code !== SUCCESS_GET_GROUP_MEMBERS)
    return <div>API Error</div>;

  if (groupMembersLoading) {
    return <LoadingSpinner size="large" />;
  }

  return <AuthorityView mapId={mapId} groupMembers={groupMembers.data} />;
};

export default Authority;
