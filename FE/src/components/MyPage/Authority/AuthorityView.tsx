import GroupInfo from '@/components/Authority/GroupInfo';
import SearchForm from '@/components/Authority/SearchForm';
import Text from '@/components/common/Text';
import { GroupMemberType } from '@/interfaces/group';
import theme from '@/styles/theme';

interface AuthorityView {
  mapId: number;
  groupMembers: GroupMemberType[];
}

const AuthorityView = ({ mapId, groupMembers }: AuthorityView) => (
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
    {groupMembers && <GroupInfo mapId={mapId} groupMembers={groupMembers} />}
    {groupMembers && (
      <SearchForm
        mapId={mapId}
        groupMembers={groupMembers.map(
          (member: GroupMemberType) => member.member_nickname
        )}
      />
    )}
  </section>
);

export default AuthorityView;
