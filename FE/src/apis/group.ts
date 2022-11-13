import { getCookie } from '@/utils/cookie';

export const getGroupMembers = async (mapId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/groups/${mapId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const groupMembers = await response.json();

  try {
    return groupMembers;
  } catch (err) {
    throw new Error(`postNickName api fail err: ${err}`);
  }
};
