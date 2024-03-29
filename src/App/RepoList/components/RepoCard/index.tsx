import React, { FC, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { addEm, dateTrans } from './utils'
import styles from './index.module.css';

interface RepoCardProps {
  title: string,
  description: string,
  htmlUrl: string
  search:string
  stargazersCount: number,
  updatedAt: string
}

const RepoCard: FC<RepoCardProps> =({
  title,
  description,
  htmlUrl,
  search,
  stargazersCount,
  updatedAt,
}) => {
  const [titleHasKeyWord, setTitleHasKeyWord] = useState(false);
  const nowYear = moment().format('YYYY');

  useEffect(() => {
    const titleSearchIndex = title?.toUpperCase().indexOf(search.toUpperCase());
    if (titleSearchIndex >= 0) setTitleHasKeyWord(true);
  }, [title, search]);

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>
          <Card.Link target="_blank" href={htmlUrl}>
            {titleHasKeyWord ? addEm(title, search) : title}
          </Card.Link>
        </Card.Title>
        {titleHasKeyWord ? description : addEm(description, search)}
        <div className={styles.starWrapper}>
          <span>
            <a target="_blank" rel="noreferrer" href={`${htmlUrl}/stargazers`}>
              <svg height="16" viewBox="0 0 16 16" width="16">
                <path
                  fillRule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                />
              </svg>
              <span>{stargazersCount}</span>
            </a>
          </span>
          <span>Updated on {dateTrans(updatedAt, updatedAt, nowYear)}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RepoCard