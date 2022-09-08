export const getMaps = async () => {
  const response = await fetch(`/maps`);
  const mapsData = await response.json();

  try {
    return mapsData;
  } catch (err) {
    throw new Error(`getMypage get api fail err: ${err}`);
  }
};
