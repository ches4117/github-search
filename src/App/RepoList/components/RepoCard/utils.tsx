import styles from './index.module.css';
import moment from 'moment';

export const addEm = (text: string, search: string) => {
  if (text) {
    const keyWordIndex = text.toUpperCase().indexOf(search.toUpperCase());
    const newString = (
      <span>
        {text.substring(0, keyWordIndex)}
        <em className={styles.emText}>
          {text.substring(keyWordIndex, keyWordIndex + search.length)}
        </em>
        {text.substring(keyWordIndex + search.length, text.length)}
      </span>
    );
    return newString;
  }
};

export const dateTrans = (updatedTime: string, updatedAt: string, nowYear: string) => {
  if (updatedTime) {
    const momentTransList = moment(updatedAt)
      .format('DD MMM YYYY')
      .split(' ');
    const newTrans = `${parseInt(momentTransList[0])} ${momentTransList[1]} ${
      momentTransList[2] === nowYear ? '' : momentTransList[2]
    }`;
    return newTrans;
  }
  return;
};
