import { MypagePostParams, MypagePutParams } from '@/types/mypage';
import { getCookie } from '@/utils/cookie';

export const getMypage = async (name = '') => {
  const getMapURL = name
    ? `${process.env.SQUAD_MAP_OAUTH_URL}/map/group?name=${name}`
    : `${process.env.SQUAD_MAP_OAUTH_URL}/map/group`;

  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(getMapURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const mypage = await response.json();

  try {
    return mypage;
  } catch (err) {
    throw new Error(`getMypage api fail err: ${err}`);
  }
};

export const postMypage = async (myPagePostParams: MypagePostParams) => {
  const accessToken = getCookie('access_token');

  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${process.env.SQUAD_MAP_OAUTH_URL}/map`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myPagePostParams),
  });
  const mypage = await response.json();

  try {
    return mypage;
  } catch (err) {
    throw new Error(`postMypage api fail err: ${err}`);
  }
};

export const putMyPage = async (
  patchId: number,
  mypagePutParams: MypagePutParams
) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!patchId) throw new Error('id is undefined');
  if (!mypagePutParams) throw new Error('requestbody is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${patchId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mypagePutParams),
    }
  );

  const mypage = await response.json();

  try {
    return mypage;
  } catch (err) {
    throw new Error(`putMyPage api fail err: ${err}`);
  }
};

export const deleteMypage = async (deleteId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
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
  const mypage = await response.json();

  try {
    return mypage;
  } catch (err) {
    throw new Error(`deleteMypage api fail err: ${err}`);
  }
};

export const getMapDetailInfo = async (mapId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/${mapId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const mapData = await response.json();

  try {
    return mapData;
  } catch (err) {
    throw new Error(`getMapDetailInfo api fail err: ${err}`);
  }
};
