import { Comments } from '@/interfaces/Comments';

export interface PlaceDetail {
  place_id: number;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  story: string;
  detail_link: string;
  category_id: number;
  comments: Comments;
}
