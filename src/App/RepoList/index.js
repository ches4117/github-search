import React, { useContext, useRef, useEffect } from 'react';
import { GithubContext } from '../../context';
import styles from './index.css';
import { octokit } from '../../utils';

function RepoList() {
  const [state, dispatch] = useContext(GithubContext);
  const loader = useRef(null);
  const { search, repos, page, pageEnd } = state;
  const options = {
    rootMargin: '0px 0px 10px 0px',
    threshold: 0,
  };

  const fetchRepo = async () => {
    const result = await octokit.request('GET /search/repositories', {
      q: search,
      per_page: 10,
      page: page,
    });

    dispatch({
      type: 'setMoreRepos',
      payload: { repos: result.data.items },
    });
  };

  useEffect(() => {
    if (loader.current && search && !pageEnd) {
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          fetchRepo();
          observer.unobserve(entries[0].target);
        }
      }, options);
      observer.observe(loader.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repos]);

  return (
    <>
      {repos.map((repo) => {
        return (
          <div className={`card ${styles.card}`} key={repo.id}>
            <div className="card-body">{repo.description} </div>
          </div>
        );
      })}
      <div ref={loader} />
    </>
  );
}

export default RepoList;
