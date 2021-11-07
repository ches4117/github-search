export const fetchInitRepo = async ({ nowSearch, nowPage }: searchObject) => {
  try {
    if (nowSearch) {
      setIsLoading(true); 
      const result = await octokit.request('GET /search/repositories', {
        q: nowSearch,
        page: nowPage,
        per_page: perPage,
      });

      dispatch({
        type: 'setRepos',
        payload: { repos: result.data.items },
      });
      setIsLoading(false);
    }
  } catch (e: any) {
    handleErrorFetch(e);
  }
};

export const fetchMoreRepo = async ({ nowSearch, nowPage }: searchObject) => {
  try {
    setIsLoading(true);
    if (nowSearch) {
      const result = await octokit.request('GET /search/repositories', {
        q: nowSearch,
        page: nowPage,
        per_page: perPage,
      });

      dispatch({
        type: 'setMoreRepos',
        payload: { repos: result.data.items, page: nowPage },
      });
      setIsLoading(false);
    }
  } catch (e: any) {
    handleErrorFetch(e);
  }
};