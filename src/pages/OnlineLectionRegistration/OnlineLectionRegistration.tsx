import { memo } from 'react';

import styles from './online-registration.module.scss';

function OnlineLectionRegistration() {
  return (
    <div className={styles.content}>
      <div className={styles.lectureText}> Регистрация на дистанционной лекции</div>
      <div className={styles.lectureRegistrationBlock}>
        Введите код лекции
        <input type="text" />
      </div>
    </div>
  );
}

export default memo(OnlineLectionRegistration);
