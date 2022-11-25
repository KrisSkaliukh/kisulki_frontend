import { memo } from 'react';

import styles from './teacher-page.module.scss';

function TeacherPage() {
  return (
    <div className={styles.content}>
      <div>Teacher Page</div>
    </div>
  );
}

export default memo(TeacherPage);
