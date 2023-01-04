import { PlacePostParams } from '@/types/place';
import { getCookie } from '@/utils/cookie';

export const getPlaceDeatil = async (mapId: number, placeId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

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
  const placeDetail = await response.json();

  try {
    return placeDetail;
  } catch (err) {
    throw new Error(`getPlaceDetail api fail err: ${err}`);
  }
};

export const postPlace = async ({
  mapId,
  placePostParams,
}: {
  mapId: number;
  placePostParams: PlacePostParams;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placePostParams),
    }
  );

  const place = await response.json();

  try {
    return place;
  } catch (err) {
    throw new Error(`postPlace api fail err: ${err}`);
  }
};

export const patchPlace = async ({
  mapId,
  patchId,
  placePatchParams,
}: {
  mapId: number;
  patchId: number;
  placePatchParams: { category_id: number; story: string };
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');
  if (!patchId) throw new Error('patchId is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places/${patchId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placePatchParams),
    }
  );

  const placeData = await response.json();

  try {
    return placeData;
  } catch (err) {
    throw new Error(`patchPlace api fail err: ${err}`);
  }
};

export const deletePlace = async (mapId: number, placeId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');
  if (!placeId) throw new Error('placeId is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places/${placeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const place = await response.json();

  try {
    return place;
  } catch (err) {
    throw new Error(`deletePlace api fail err: ${err}`);
  }
};
