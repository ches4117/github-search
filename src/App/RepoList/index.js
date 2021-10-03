/* eslint-disable react-hooks/exhaustive-deps */
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

  const fetchInitRepo = async ({ nowSearch, nowPage }) => {
    try {
      if (nowSearch) {
        const result = await octokit.request('GET /search/repositories', {
          q: nowSearch,
          page: nowPage,
        });

        dispatch({
          type: 'setRepos',
          payload: { repos: result.data.items },
        });
      }
    } catch (e) {
      dispatch({
        type: 'setError',
        payload: { error: errorStatusText[e.status] },
      });
    }
  };

  const fetchMoreRepo = async ({ nowSearch, nowPage }) => {
    try {
      if (nowSearch) {
        const result = await octokit.request('GET /search/repositories', {
          q: nowSearch,
          page: nowPage,
        });

        dispatch({
          type: 'setMoreRepos',
          payload: { repos: result.data.items },
        });
      }
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

  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      fetchMoreRepo({ nowSearch: search, nowPage: page });
      observer.unobserve(entries[0].target);
    }
  }, options);

  useEffect(() => {
    if (loader.current && search && !pageEnd) {
      observer.observe(loader.current);
    }
  }, [repos]);

  useEffect(() => {
    if (search) {
      fetchInitRepo({ nowSearch: search, nowPage: 1 });
      observer.disconnect();
    } else {
      dispatch({
        type: 'reset',
      });
      observer.observe(loader.current);
    }
  }, [search]);

  return (
    <>
      {repos.map((repo) => {
        return (
          <div
            className={`card ${styles.card}`}
            key={`${repo.id}-${repo.name}`}
          >
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
