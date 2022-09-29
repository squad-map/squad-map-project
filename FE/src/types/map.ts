export type CategoryType = {
  name: string;
  color: string;
};

export type MapType = {
  id: number;
  title: string;
  category: CategoryType[];
  address: string;
  description: string;
  lat: number;
  lng: number;
  color: string;
};
