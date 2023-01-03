import { CategoryPostParams } from '@/types/category';
import { CategoryRequestPatchBody } from '@/types/map';
import { getCookie } from '@/utils/cookie';

export const getMapCategories = async (map_id: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${map_id}/categories`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const categoriesData = await response.json();

  try {
    return categoriesData;
  } catch (err) {
    throw new Error(`getCategory api fail err: ${err}`);
  }
};

export const postCategory = async ({
  map_id,
  categoryRequestBody,
}: {
  map_id: number;
  categoryRequestBody: CategoryPostParams;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${map_id}/categories`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryRequestBody),
    }
  );

  const data = await response.json();

  try {
    return data;
  } catch (err) {
    throw new Error(`postCategry api fail err: ${err}`);
  }
};

export const patchCategory = async ({
  mapId,
  patchId,
  categoryRequestBody,
}: {
  mapId: number;
  patchId: number;
  categoryRequestBody: CategoryRequestPatchBody;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  if (!patchId) throw new Error('patchId is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/categories/${patchId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryRequestBody),
    }
  );

  const myMapData = await response.json();

  try {
    return myMapData;
  } catch (err) {
    throw new Error(`patchCategory api fail err: ${err}`);
  }
};

export const deleteCategory = async ({
  mapId,
  deleteId,
}: {
  mapId: number;
  deleteId: number;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/categories/${deleteId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const mypageData = await response.json();

  try {
    return mypageData;
  } catch (err) {
    throw new Error(`deleteCategory api fail err: ${err}`);
  }
};
