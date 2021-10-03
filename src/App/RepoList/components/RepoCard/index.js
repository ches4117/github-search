import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './index.module.css';

export default function RepoCard({ title, description, htmlUrl }) {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>
          <Card.Link target="_blank" href={htmlUrl}>
            {title}
          </Card.Link>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
