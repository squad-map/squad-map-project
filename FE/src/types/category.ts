import { CategoryType } from '@/interfaces/Category';

export type CategoryPostParams = 'category_name' | 'color' | 'map_id';
export type CategoryPutParams = Omit<CategoryType, 'category_id'>;
