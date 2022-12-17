export interface IMyMap {
  id: number;
  host_id: number;
  host_nickname: string;
  host_profile_image: string;
  map_name: string;
  map_emoji: string;
  categories: { name: string; color: string }[];
  places_count: number;
}
