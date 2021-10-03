import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './index.module.css';

RepoCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  htmlUrl: PropTypes.string,
};

RepoCard.defaultProps = {
  title: '',
  description: '',
  htmlUrl: '',
};

export default function RepoCard({ title, description, htmlUrl, search }) {
  const [titleHasKeyWord, setTitleHasKeyWord] = useState(false);
  const addEm = (text) => {
    if (text) {
      const keyWordIndex = text.indexOf(search);
      const newString = (
        <span>
          {text.substring(0, keyWordIndex)}
          <em className={styles.emText}>{search}</em>
          {text.substring(keyWordIndex + search.length, text.length)}
        </span>
      );
      return newString;
    }
  };
  useState(() => {
    const titleSearchIndex = title.indexOf(search);
    if (titleSearchIndex >= 0) setTitleHasKeyWord(true);
  });

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>
          <Card.Link target="_blank" href={htmlUrl}>
            {titleHasKeyWord ? addEm(title) : title}
          </Card.Link>
        </Card.Title>
        <Card.Text>
          {titleHasKeyWord ? description : addEm(description)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
