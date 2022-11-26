import cn from 'classnames';
import { memo, useState } from 'react';

import styles from './student-page.module.scss';

function StudentPage() {
  const [isExpanded, setIsExpanded] = useState('none');

  const selectMode = (mode: string) => {
    setIsExpanded(mode);
  };

  return (
    <div className={styles.content}>
      <div
        role="none"
        onClick={() => selectMode('offline')}
        className={cn({
          [styles.lectureOffline]: isExpanded === 'none',
          [styles.expandedOffline]: isExpanded === 'offline',
          [styles.hideOffline]: isExpanded === 'online',
        })}
      >
        <div className={isExpanded !== 'online' ? styles.lectureTextOffline : styles.hiddenText}>
          Регистрация
          {' '}
          <br />
          {' '}
          на очной лекции
        </div>
      </div>
      <div
        role="none"
        onClick={() => selectMode('online')}
        className={cn({
          [styles.lectureOnline]: isExpanded === 'none',
          [styles.expandedOnline]: isExpanded === 'online',
          [styles.hideOnline]: isExpanded === 'offline',
        })}
      >
        <div className={isExpanded !== 'offline' ? styles.lectureTextOnline : styles.hiddenText}>
          Регистрация
          {' '}
          <br />
          {' '}
          на дистанционной лекции
        </div>
      </div>
    </div>
  );
}

export default memo(StudentPage);
