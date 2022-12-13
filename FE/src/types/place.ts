import { PlaceDetail } from '@/interfaces/Place';

export type PlacePostParams = Omit<PlaceDetail, 'place_id'> | 'map_id';
