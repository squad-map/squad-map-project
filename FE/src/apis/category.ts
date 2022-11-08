import { CategoryPostParams } from '@/types/category';
import { getCookie } from '@/utils/cookie';

export const postCategory = async (categoryRequestBody: CategoryPostParams) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/categories`,
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
