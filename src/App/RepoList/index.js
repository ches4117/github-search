/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { GithubContext } from '../../context';
import styles from './index.css';
import { octokit, errorStatusText } from '../../utils';

function RepoList() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(GithubContext);
  const lastItemRef = useRef();
  const observerRef = useRef();
  const { search, repos, page, pageEnd, error } = state;

  const fetchInitRepo = async ({ nowSearch, nowPage }) => {
    try {
      if (nowSearch) {
        setIsLoading(true);
        const result = await octokit.request('GET /search/repositories', {
          q: nowSearch,
          page: nowPage,
        });

        dispatch({
          type: 'setRepos',
          payload: { repos: result.data.items },
        }).then(() => {
          setIsLoading(false);
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

  useEffect(() => {
    const options = {
      rootMargin: '0px 0px 10px 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMoreRepo({ nowSearch: search, nowPage: page + 1 });
      }
    }, options);

    if (lastItemRef.current && !pageEnd) {
      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  });

  useEffect(() => {
    if (search) {
      fetchInitRepo({ nowSearch: search, nowPage: 1 });
    } else {
      dispatch({
        type: 'reset',
      });
    }
  }, [search]);

  return (
    <>
      {repos.map((repo, index) => {
        if (index === repos.length - 1) {
          return (
            <div
              className={`card ${styles.card}`}
              key={`${repo.id}-${repo.name}`}
              ref={lastItemRef}
            >
              <div className="card-body">{repo.description} </div>
            </div>
          );
        }
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
      {isLoading && search && (
        <ClipLoader
          css={{
            display: 'block',
            margin: '100px auto',
          }}
          size={100}
        />
      )}
    </>
  );
}

export default RepoList;
