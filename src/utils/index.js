import { Octokit } from '@octokit/core';

export const errorStatusText = Object.freeze({
  403: 'api 請求過於頻繁，請稍後再試。',
});

export const octokit = new Octokit({
  auth: process.env.REACT_APP_AUTH,
});
