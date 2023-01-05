import { API_URL } from '@/constants/url';
import { CategoryPostParams, CategoryPutParams } from '@/types/category';
import { getCookie } from '@/utils/cookie';

export const getMapCategories = async (mapId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${API_URL}/map/${mapId}/categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const categories = await response.json();

  try {
    return categories;
  } catch (err) {
    throw new Error(`getMapCategories api fail err: ${err}`);
  }
};

export const postCategory = async ({
  map_id,
  categoryPostParams,
}: {
  map_id: number;
  categoryPostParams: CategoryPostParams;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${API_URL}/map/${map_id}/categories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryPostParams),
  });

  const category = await response.json();

  try {
    return category;
  } catch (err) {
    throw new Error(`postCategry api fail err: ${err}`);
  }
};

export const putCategory = async ({
  mapId,
  patchId,
  categoryPutParams,
}: {
  mapId: number;
  patchId: number;
  categoryPutParams: CategoryPutParams;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!patchId) throw new Error('patchId is undefined');

  const response = await fetch(
    `${API_URL}/map/${mapId}/categories/${patchId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryPutParams),
    }
  );

  const category = await response.json();

  try {
    return category;
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
  if (!accessToken) window.location.href = '/login';
  const response = await fetch(
    `${API_URL}/map/${mapId}/categories/${deleteId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const category = await response.json();

  try {
    return category;
  } catch (err) {
    throw new Error(`deleteCategory api fail err: ${err}`);
  }
};
