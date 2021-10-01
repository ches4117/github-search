import React, { useContext } from 'react';
import { GithubContext } from '../../context';
import styles from './index.css';

function RepoList() {
  const [state] = useContext(GithubContext);

  return (
    <>
      {state.repos.map((repo) => {
        return (
          <div class="card" key={repo.id} className={styles.card}>
            <div class="card-body">{repo.description} </div>
          </div>
        );
      })}
    </>
  );
}

export default RepoList;
