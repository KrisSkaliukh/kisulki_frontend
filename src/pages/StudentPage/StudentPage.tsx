import { memo } from 'react';

import styles from './student-page.module.scss';

function StudentPage() {
  return (
    <div className={styles.content}>
      <div>Student Page</div>
    </div>
  );
}

export default memo(StudentPage);
