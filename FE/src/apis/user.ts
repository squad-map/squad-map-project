import { getCookie } from '@/utils/cookie';

export const postNickName = async (nickName: string) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}member/update`,
    {
      method: 'POST',
      headers: {
        Authorization: `bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: nickName }),
    }
  );

  const updatedData = await response.json();

  try {
    return updatedData;
  } catch (err) {
    throw new Error(`postNickName api fail err: ${err}`);
  }
};
