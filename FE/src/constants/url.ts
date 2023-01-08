export const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.SQUAD_MAP_GIT_CLIENT_ID}&scope=repo:status read:repo_hook user:email`;
export const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.STORYBOOK_API_URL
    : process.env.SQUADMAP_API_URL;
