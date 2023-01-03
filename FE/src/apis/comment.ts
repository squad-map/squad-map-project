import { getCookie } from '@/utils/cookie';

export const postComment = async ({
  map_id,
  place_id,
  content,
}: {
  map_id: number;
  place_id: number;
  content: string;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${map_id}/places/${place_id}/comments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );

  const commentData = await response.json();

  try {
    return commentData;
  } catch (err) {
    throw new Error(`postCategry api fail err: ${err}`);
  }
};
