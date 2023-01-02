import { PlacePostParams } from '@/types/place';
import { getCookie } from '@/utils/cookie';

export const getPlaceDeatilInfo = async (id: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/places/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const mapData = await response.json();

  try {
    return mapData;
  } catch (err) {
    throw new Error(`getMypage get api fail err: ${err}`);
  }
};

export const postPlace = async ({
  map_id,
  placeRequestBody,
}: {
  map_id: number;
  placeRequestBody: PlacePostParams;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${map_id}/places`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeRequestBody),
    }
  );

  const mapData = await response.json();

  try {
    return mapData;
  } catch (err) {
    throw new Error(`장소생성 api fail err: ${err}`);
  }
};
