import { CircularProgress } from '@mui/material';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { requestGetSchedule } from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import StudentPage from '../StudentPage';
import TeacherPage from '../TeacherPage';
import styles from './lection-page.module.scss';

function LectionPage() {
  const user = useSelector<RootState, any>((state) => state.mainReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetSchedule());
  }, []);

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

export default memo(LectionPage);
