import AuthorityView from './AuthorityView';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { SUCCESS_GET_GROUP_MEMBERS } from '@/constants/code';
import useGetGroupMembers from '@/hooks/query/useGetGroupMembers';

interface AuthorityProps {
  mapId: number;
}

const Authority = ({ mapId }: AuthorityProps) => {
  const { groupMembers, groupMembersLoading } = useGetGroupMembers({ mapId });

  if (!groupMembersLoading && groupMembers.code !== SUCCESS_GET_GROUP_MEMBERS)
    return <div>API Error</div>;

  if (groupMembersLoading) {
    return <LoadingSpinner size="large" />;
  }

  return <AuthorityView mapId={mapId} groupMembers={groupMembers.data} />;
};

export default Authority;
