import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { memo } from 'react';

import styles from './header.module.scss';

interface IProps {
  isStudent: boolean;
}

function Header(props: IProps) {
  const { isStudent } = props;
  const name = 'Иванов Иван Иванович';
  const group = isStudent ? 'ПИ-131' : '';
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="logo_sfedu.png" alt="logo" height="50px" width="50px" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.name}>
          {name}
          <div className={styles.group}>
            {group}
          </div>
        </div>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.logout}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
