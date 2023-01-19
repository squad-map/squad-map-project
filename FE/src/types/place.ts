import { PlaceDetail } from '@/interfaces/Place';

export type PlacePostParams = Omit<PlaceDetail, 'place_id'> | 'map_id';
export type PlacePatchParams = { category_id: number; story: string };
