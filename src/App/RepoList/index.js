import React, { useContext, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GithubContext } from '../../context';
import styles from './index.css';
import { octokit, errorStatusText } from '../../utils';

function RepoList() {
  const [state, dispatch] = useContext(GithubContext);
  const loader = useRef(null);
  const { search, repos, page, pageEnd, error } = state;
  const options = {
    rootMargin: '0px 0px 10px 0px',
    threshold: 0,
  };

  const fetchRepo = async () => {
    try {
      const result = await octokit.request('GET /search/repositories', {
        q: search,
        per_page: 10,
        page: page,
      });

      dispatch({
        type: 'setMoreRepos',
        payload: { repos: result.data.items },
      });
    } catch (e) {
      dispatch({
        type: 'setError',
        payload: { error: errorStatusText[e.status] },
      });
    }
  };

  const clearError = () => {
    dispatch({
      type: 'setError',
      payload: { error: undefined },
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
      {error && (
        <Modal show onHide={clearError}>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={clearError}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div ref={loader} />
    </>
  );
}

export default RepoList;
