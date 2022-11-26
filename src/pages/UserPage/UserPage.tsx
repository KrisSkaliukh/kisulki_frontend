import { CircularProgress } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import { RootState } from '../../redux/reducers/rootReducer';
import StudentPage from '../StudentPage';
import TeacherPage from '../TeacherPage';
import styles from './user-page.module.scss';

function UserPage() {
  const user = useSelector<RootState, any>((state) => state.mainReducer.user);

  return (
    <div className={styles.content}>
      {user ? (
        <>
          <Header user={user} isStudent={false} />
          {false ? <StudentPage /> : <TeacherPage />}
        </>
      ) : <div className={styles.loader}><CircularProgress /></div>}
    </div>
  );
}

export default memo(UserPage);
