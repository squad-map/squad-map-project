import { IMap } from '@/interfaces/IMap';

export type CategoryType = {
  category_id: number;
  category_name: string;
  category_color: string;
};

export type PlaceType = {
  place_id: number;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  detail_link?: string;
};

export type CategorizedPlaces = {
  category_info: CategoryType;
  places: PlaceType[];
};

export type MapType = {
  map_id: number;
  map_name: string;
  map_emoji: string;
  host_id: number;
  host_nickname: string;
  host_profile_image: string;
  places_count: number;
  categorized_places: CategorizedPlaces[];
};

export type MapUserType = Pick<
  IMap,
  'host_id' | 'host_nickname' | 'host_profile_image'
>;

export type MapHeaderType = {
  map_id: number;
  emoji: string;
  title: string;
  category_info: CategoryType[];
};
