import { MypagePostParams } from '@/types/mypage';
import { getCookie } from '@/utils/cookie';

export const getMypage = async (name = '') => {
  const getMapURL = name
    ? `${process.env.SQUAD_MAP_OAUTH_URL}/map/group?name=${name}`
    : `${process.env.SQUAD_MAP_OAUTH_URL}/map/group`;

  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(getMapURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
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

  const response = await fetch(`${process.env.SQUAD_MAP_OAUTH_URL}/map`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mypageRequestBody),
  });
  const myMapData = await response.json();

  try {
    return myMapData;
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

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${patchId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mypageRequestBody),
    }
  );

  const myMapData = await response.json();

  try {
    return myMapData;
  } catch (err) {
    throw new Error(`patchMypage get api fail err: ${err}`);
  }
};

export const deleteMypage = async (deleteId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');
  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${deleteId}`,
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
    throw new Error(`deleteMypage get api fail err: ${err}`);
  }
};

export const getMapDetailInfo = async (id: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accesToken is undefined');

  const response = await fetch(`${process.env.SQUAD_MAP_OAUTH_URL}/map/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const mapData = await response.json();

  try {
    return mapData;
  } catch (err) {
    throw new Error(`getMypage get api fail err: ${err}`);
  }
};
