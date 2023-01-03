import { PlacePostParams } from '@/types/place';
import { getCookie } from '@/utils/cookie';

export const getPlaceDeatilInfo = async (mapId: number, placeId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places/${placeId}`,
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
    throw new Error(`getPlaceDetailInfo get api fail err: ${err}`);
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
    throw new Error(`postPlace api fail err: ${err}`);
  }
};

export const patchPlace = async ({
  mapId,
  patchId,
  placeRequestBody,
}: {
  mapId: number;
  patchId: number;
  placeRequestBody: { category_id: number; story: string };
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  if (!patchId) throw new Error('patchId is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places/${patchId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeRequestBody),
    }
  );

  const placeData = await response.json();

  try {
    return placeData;
  } catch (err) {
    throw new Error(`patchPlace api fail err: ${err}`);
  }
};

export const deletePlace = async (map_id: number, place_id: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  if (!place_id) throw new Error('place_id is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${map_id}/places/${place_id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const placeData = await response.json();

  try {
    return placeData;
  } catch (err) {
    throw new Error(`deletePlace api fail err: ${err}`);
  }
};
