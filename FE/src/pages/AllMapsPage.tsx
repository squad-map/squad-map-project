import { useQuery } from 'react-query';

import * as S from './style';

const getMapsData = async () => {
  const response = await fetch('/');
  const maps = await response.json();
  return maps;
};

export default function AllMapsPage() {
  const { data: mapsData, isLoading: loading } = useQuery(['allMaps'], () =>
    getMapsData()
  );

  return <S.Wrapper>AllMapsPage</S.Wrapper>;
}
