import { memo } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers/rootReducer';
import StudentPage from '../StudentPage';
import TeacherPage from '../TeacherPage';
import styles from './user-page.module.scss';

function UserPage() {
  const user = useSelector<RootState, any>((state) => state.mainReducer.user);
  const isStudent = true;
  console.log(user);

  return (
    <div className={styles.content}>
      <Header isStudent={isStudent} />
      {isStudent ? <StudentPage /> : <TeacherPage />}
    </div>
  );
}

export default memo(UserPage);
