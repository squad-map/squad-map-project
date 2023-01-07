import { API_URL } from '@/constants/url';

export const getPublicMaps = async (name: string, lastMapId: number) => {
  const response = await fetch(
    `${API_URL}/map/public?name=${name}&lastMapId=${lastMapId}`
  );

  const maps = await response.json();

  try {
    return maps;
  } catch (err) {
    throw new Error(`getPublicMaps api fail err: ${err}`);
  }
};
