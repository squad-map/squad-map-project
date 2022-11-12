import { getCookie } from '@/utils/cookie';

export const findNickName = async (nickname: string) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/members?nickname=${nickname}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const nickNameData = await response.json();

  try {
    return nickNameData;
  } catch (err) {
    throw new Error(`postNickName api fail err: ${err}`);
  }
};

export const patchNickName = async (nickName: string) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(`${process.env.SQUAD_MAP_OAUTH_URL}/members`, {
    method: 'PATCH',
    headers: {
      Authorization: `bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname: nickName }),
  });

  const updatedData = await response.json();

  try {
    return updatedData;
  } catch (err) {
    throw new Error(`postNickName api fail err: ${err}`);
  }
};
