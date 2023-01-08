import { API_URL } from '@/constants/url';
import { PlacePostParams } from '@/types/place';
import { getCookie } from '@/utils/cookie';

export const getPlaceDeatil = async ({
  mapId,
  placeId,
}: {
  mapId: number;
  placeId: number;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!placeId) return false;

  const response = await fetch(`${API_URL}/map/${mapId}/places/${placeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

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
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${API_URL}/map/${mapId}/places`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placePostParams),
  });

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
  if (!accessToken) window.location.href = '/login';
  if (!patchId) throw new Error('patchId is undefined');

  const response = await fetch(`${API_URL}/map/${mapId}/places/${patchId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placePatchParams),
  });

  const placeData = await response.json();

  try {
    return placeData;
  } catch (err) {
    throw new Error(`patchPlace api fail err: ${err}`);
  }
};

export const deletePlace = async (mapId: number, placeId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!placeId) throw new Error('placeId is undefined');

  const response = await fetch(`${API_URL}/map/${mapId}/places/${placeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const place = await response.json();

  try {
    return place;
  } catch (err) {
    throw new Error(`deletePlace api fail err: ${err}`);
  }
};
