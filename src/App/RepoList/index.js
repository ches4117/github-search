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
  const { search, repos, perPage, page, pageEnd, error } = state;

  // If api error, show the error moal and disconnect observerRef
  const handleErrorFetch = (error) => {
    dispatch({
      type: 'setError',
      payload: { error: errorStatusText[error.status] },
    });
    setShowModal(true);
    window.scrollTo(0, window.scrollY - 200);
  };

  const fetchInitRepo = async ({ nowSearch, nowPage }) => {
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
    } catch (e) {
      handleErrorFetch(e);
    }
  };

  const fetchMoreRepo = async ({ nowSearch, nowPage }) => {
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
    } catch (e) {
      handleErrorFetch(e);
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: '0px 0px 20px 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMoreRepo({ nowSearch: search, nowPage: page + 1 });
      }
    }, options);

    // If api can get more pages, continue observe lastItem
    if (lastItemRef.current && !pageEnd && !error) {
      observerRef.current.observe(lastItemRef.current);
    }

    return () => {
      observerRef.current.disconnect();
    };
  }, [repos]);

  useEffect(() => {
    if (search) {
      fetchInitRepo({ nowSearch: search, nowPage: 1 });
    } else {
      // If search clear, then reset all state
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
            <div key={`${repo.full_name}${index}`} ref={lastItemRef}>
              <RepoCard
                title={repo.full_name}
                stargazersCount={repo.stargazers_count}
                updatedAt={repo.updated_at}
                description={repo.description}
                htmlUrl={repo.html_url}
                search={search}
              />
            </div>
          );
        }
        return (
          <RepoCard
            key={`${repo.full_name}${index}`}
            title={repo.full_name}
            stargazersCount={repo.stargazers_count}
            updatedAt={repo.updated_at}
            description={repo.description}
            htmlUrl={repo.html_url}
            search={search}
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
