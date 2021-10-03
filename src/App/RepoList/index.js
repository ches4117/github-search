/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { GithubContext } from '../../context';
import RepoCard from './components/RepoCard';
import NoRepoCard from './components/NoRepoCard';
import { octokit, errorStatusText } from '../../utils';

function RepoList() {
  const [state, dispatch] = useContext(GithubContext);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        });
        setIsLoading(false);
      }
    } catch (e) {
      dispatch({
        type: 'setError',
        payload: { error: errorStatusText[e.status] },
      });
      setShowModal(true);
      observerRef.current.disconnect();
    }
  };

  const fetchMoreRepo = async ({ nowSearch, nowPage }) => {
    try {
      setIsLoading(true);
      if (nowSearch) {
        const result = await octokit.request('GET /search/repositories', {
          q: nowSearch,
          page: nowPage,
        });

        dispatch({
          type: 'setMoreRepos',
          payload: { repos: result.data.items },
        });
        setIsLoading(false);
      }
    } catch (e) {
      dispatch({
        type: 'setError',
        payload: { error: errorStatusText[e.status] },
      });
      setShowModal(true);
    }
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

    if (lastItemRef.current && !pageEnd && !error) {
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {repos.length === 0 && !isLoading && <NoRepoCard />}
      {repos.map((repo, index) => {
        if (index === repos.length - 1) {
          return (
            <div key={`${repo.id}-${repo.name}`}>
              <RepoCard
                title={repo.full_name}
                description={repo.description}
                htmlUrl={repo.html_url}
              />
              <div ref={lastItemRef} />
            </div>
          );
        }
        return (
          <RepoCard
            key={`${repo.id}-${repo.name}`}
            title={repo.full_name}
            description={repo.description}
            htmlUrl={repo.html_url}
          />
        );
      })}
      {error && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalClose}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {search && !pageEnd && !error && (
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
