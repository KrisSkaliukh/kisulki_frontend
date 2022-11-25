import { memo } from 'react';

import Header from '../../components/Header';
import StudentPage from '../StudentPage';
import TeacherPage from '../TeacherPage';
import styles from './user-page.module.scss';

function UserPage() {
  const isStudent = true;

  return (
    <div className={styles.content}>
      <Header isStudent={isStudent} />
      {isStudent ? <StudentPage /> : <TeacherPage />}
    </div>
  );
}

export default memo(UserPage);
