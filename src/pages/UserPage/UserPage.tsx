import { CircularProgress } from '@mui/material';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { requestGetSchedule } from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import Schedule from '../Schedule';
import styles from './user-page.module.scss';

function UserPage() {
  const user = useSelector<RootState, any>((state) => state.mainReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetSchedule());
  }, []);

  return (
    <div className={styles.content}>
      {user ? (
        <>
          <Header user={user} isStudent={user.user.role === 'student'} />
          <Schedule />
        </>
      ) : <div className={styles.loader}><CircularProgress /></div>}
    </div>
  );
}

export default memo(UserPage);
