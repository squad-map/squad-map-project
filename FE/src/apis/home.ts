export const getMaps = async (lastMapId: number) => {
  const response = await fetch(
    `${process.env.SQUAD_MAP_OAUTH_URL}/map/public?lastMapId=${lastMapId}`
  );

  const mapsData = await response.json();

  try {
    return mapsData;
  } catch (err) {
    throw new Error(`getMypage get api fail err: ${err}`);
  }
};
