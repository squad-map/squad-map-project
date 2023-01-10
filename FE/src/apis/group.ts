import { GroupPostParams } from '@/types/group';
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
    throw new Error(`getGroupMembers api fail err: ${err}`);
  }
};

export const postGroupMember = async (
  mapId: number,
  groupPostBody: GroupPostParams
) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/groups/${mapId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupPostBody),
    }
  );

  const groupMember = await response.json();

  try {
    return groupMember;
  } catch (err) {
    throw new Error(`postGroupMember api fail err: ${err}`);
  }
};

export const putGroupMember = async (
  mapId: number,
  groupPutBody: { member_id: number; permission_level: string }
) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/groups/${mapId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupPutBody),
    }
  );

  const data = await response.json();

  try {
    return data;
  } catch (err) {
    throw new Error(`putGroupMember api fail err: ${err}`);
  }
};

export const deleteGroupMember = async (
  mapId: number,
  groupDeleteBody: { selectedMemberId: number }
) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) throw new Error('accessToken is undefined');

  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/groups/${mapId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupDeleteBody),
    }
  );

  const data = await response.json();

  try {
    return data;
  } catch (err) {
    throw new Error(`deleteGroupMember api fail err: ${err}`);
  }
};
