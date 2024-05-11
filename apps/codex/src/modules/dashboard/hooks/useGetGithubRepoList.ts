import { Octokit } from '@octokit/core';
import { useQuery } from '@tanstack/react-query';

export const useGetGithubRepoList = (token?: string) => {
  return useQuery({
    enabled: !!token,
    queryKey: ['GET_GITHUB_REPO_LIST'],
    queryFn: async () => {
      if (!token) return;

      const octokit = new Octokit({
        auth: token,
      });

      const res = await octokit.request('GET /user/repos');
      console.log('res', res);
      return res.data;
    },
    staleTime: 60_000,
  });
};
