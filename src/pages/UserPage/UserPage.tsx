import { CircularProgress } from '@mui/material';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FirstLoginSelect from '../../components/FirstLoginSelect';
import Header from '../../components/Header';
import { requestGetSchedule } from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import Schedule from '../Schedule';
import styles from './user-page.module.scss';

function UserPage() {
  const user = useSelector<RootState, any>((state) => state.mainReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.user.isFirstLogin && user.user.role === 'student') {
      return undefined;
    }
    if (user && user.group.id && user.user.role === 'student') {
      dispatch(requestGetSchedule({ groupId: user.group.id, surname: null }));
    }
    if (user && user.user.role !== 'student') {
      dispatch(requestGetSchedule({ groupId: null, surname: user.displayName }));
    }
    return undefined;
  }, [user]);
  return (
    <div className={styles.content}>
      {user ? (
        <>
          <Header user={user} isStudent={user.user.role === 'student'} />
          {user.user.isFirstLogin && user.user.role === 'student' ? <FirstLoginSelect />
            : <Schedule />}
        </>
      ) : <div className={styles.loader}><CircularProgress /></div>}
    </div>
  );
}

export default memo(UserPage);
