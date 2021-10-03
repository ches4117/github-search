import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './index.module.css';

export default function NoRepoCard({ title, description, htmlUrl }) {
  return (
    <Card className={styles.cardWrapper}>
      <Card.Body className={styles.cardBody}>
        <Card.Text>目前尚無資料</Card.Text>
      </Card.Body>
    </Card>
  );
}
