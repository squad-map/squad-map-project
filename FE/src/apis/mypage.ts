import { MypagePostParams } from '@/types/mypage';
import { getCookie } from '@/utils/cookie';

export const getMypage = async () => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(`/mypage`);
  const mypageData = await response.json();

  try {
    return mypageData;
  } catch (err) {
    throw new Error(`getMypage get api fail err: ${err}`);
  }
};

export const postMypage = async (mypageRequestBody: MypagePostParams) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(`/mypage`, {
    method: 'POST',
    headers: {
      Authorization: `Barer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mypageRequestBody),
  });
  const mypageData = await response.json();

  try {
    return mypageData;
  } catch (err) {
    throw new Error(`postMypage get api fail err: ${err}`);
  }
};

export const patchMypage = async (
  patchId: number,
  mypageRequestBody: MypagePostParams
) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  if (!patchId) throw new Error('id is undefined');
  if (!mypageRequestBody) throw new Error('requestbody is undefined');

  const response = await fetch(`/mypage/${patchId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Barer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mypageRequestBody),
  });
  const mypageData = await response.json();

  try {
    return mypageData;
  } catch (err) {
    throw new Error(`patchMypage get api fail err: ${err}`);
  }
};

export const deleteMypage = async (deleteId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  const response = await fetch(`mypage/${deleteId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Barer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const mypageData = await response.json();

  try {
    return mypageData;
  } catch (err) {
    throw new Error(`deleteMypage get api fail err: ${err}`);
  }
};
