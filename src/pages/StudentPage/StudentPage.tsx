import cn from 'classnames';
import { memo, useState } from 'react';

import styles from './student-page.module.scss';

function StudentPage() {
  const [isExpanded, setIsExpanded] = useState('none');
  const [isSelected, setIsSelected] = useState('none');

  const selectMode = (mode: string) => {
    setIsExpanded(mode);
    setTimeout(() => setIsSelected(mode), 1000);
  };

  return (
    <div className={styles.content}>
      {isSelected === 'none'
      && (
      <>
        <div
          role="none"
          onClick={() => selectMode('offline')}
          className={cn({
            [styles.lectureOffline]: isExpanded === 'none',
            [styles.expandedOffline]: isExpanded === 'offline',
            [styles.hideOffline]: isExpanded === 'online',
          })}
        >
          <div className={isExpanded !== 'offline' ? styles.lectureTextOffline : styles.hiddenText}>
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
          <div className={isExpanded !== 'online' ? styles.lectureTextOnline : styles.hiddenText}>
            Регистрация
            {' '}
            <br />
            {' '}
            на дистанционной лекции
          </div>
        </div>
      </>
      )}

      {isSelected === 'offline'
        && (
          <div className={styles.selectedModeOffline}>
            <div className={styles.selectedModeTitle}>
              Регистрация на очной лекции
            </div>
            <input
              type="text"
              placeholder="Введите код лекции"
              className={styles.selectedModeCode}
            />
          </div>
        )}

      {isSelected === 'online'
        && (
          <div className={styles.selectedModeOnline}>
            <div className={styles.selectedModeTitle}>
              Регистрация на дистанционной лекции
            </div>
            <input
              type="text"
              placeholder="Введите код лекции"
              className={styles.selectedModeCode}
            />
          </div>
        )}

    </div>
  );
}

export default memo(StudentPage);
