import { MapUserType } from '@/types/map';

const UserProfile = ({ user }: { user: MapUserType }) => (
  <div className="flex items-center gap-4 mt-4">
    <img
      className="w-8 h-8 rounded-2xl"
      src={user.host_profile_image}
      alt="profile_image"
    />
    <span className="text-gray">지도 Host: {user.host_nickname}</span>
  </div>
);

export default UserProfile;
