export const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:8080/callback`;
