export const getMaps = async (lastMapId: number) => {
  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/public?lastMapId=${lastMapId}`
  );

  const maps = await response.json();

  try {
    return maps;
  } catch (err) {
    throw new Error(`getMypage api fail err: ${err}`);
  }
};
