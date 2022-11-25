import { memo } from 'react';

import styles from './student-page.module.scss';

function StudentPage() {
  return (
    <div className={styles.content}>
      <div className={styles.lectureOffline}>
        <div className={styles.lectureText}>Вход на очную лекцию</div>
      </div>
      <div className={styles.lectureOnline}>
        <div className={styles.lectureTextOnline}>Вход на дистанционную лекцию</div>
      </div>
    </div>
  );
}

export default memo(StudentPage);
