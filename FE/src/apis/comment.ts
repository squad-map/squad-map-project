import { getCookie } from '@/utils/cookie';

export const postComment = async ({
  mapId,
  placeId,
  content,
}: {
  mapId: number;
  placeId: number;
  content: string;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}/places/${placeId}/comments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );

  const comment = await response.json();

  try {
    return comment;
  } catch (err) {
    throw new Error(`postComment api fail err: ${err}`);
  }
};

export const deleteComment = async (commentId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');
  if (!commentId) throw new Error('placeId is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const comment = await response.json();

  try {
    return comment;
  } catch (err) {
    throw new Error(`deleteComment api fail err: ${err}`);
  }
};
