import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { UserAgentApplication } from 'msal';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { requestSetUser } from '../../redux/actions';
import { getUserAgentApp } from '../../utils/authorization';
import styles from './header.module.scss';

interface IProps {
  isStudent: boolean;
  user: any;
}

function Header(props: IProps) {
  const [msalInstance, setMsalInstance] = useState<UserAgentApplication | undefined>(undefined);

  const { isStudent, user } = props;
  const group = isStudent ? 'КТсо4-5' : '';

  const dispatch = useDispatch();

  useEffect(() => {
    setMsalInstance(getUserAgentApp({
      clientId: 'ff630e51-21e2-4078-8ec7-c2de9a9c9bc8',
      useLocalStorageCache: true,
      redirectUri: 'http://localhost:3000/userpage',
    }));
  }, []);

  const logout = async () => {
    localStorage.clear();
    dispatch(requestSetUser(null));
    if (msalInstance) {
      msalInstance.logout();
    }
  };

  const lastName = user.displayName.split(' ')[0];
  const firstLetterName = user.displayName.split(' ')[1].slice(0, 1);
  const firstLetterPatronymic = user.displayName.split(' ')[2].slice(0, 1);
  const initials = `${lastName} ${firstLetterName}.${firstLetterPatronymic}.`;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="logo_sfedu.png" alt="logo" height="50px" width="50px" />
      </div>
      <div className={styles.logoMobile}>
        <img src="logo_sfedu.png" alt="logo" height="60px" width="60px" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.name}>
          {user.displayName}
          <div className={styles.group}>
            {group}
          </div>
        </div>
        <div className={styles.nameMobile}>
          {initials}
          <div className={styles.group}>
            {group}
          </div>
        </div>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div role="none" onClick={logout} className={styles.logout}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
