import { useParams } from 'react-router-dom';

export const useGetMapId = () => {
  const { id } = useParams() as { id: string };
  return +id;
};
