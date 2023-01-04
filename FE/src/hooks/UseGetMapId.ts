import { useParams } from 'react-router-dom';

export const UseGetMapId = () => {
  const { id } = useParams() as { id: string };
  return +id;
};
