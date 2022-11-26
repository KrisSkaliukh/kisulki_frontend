import moment from 'moment';
import { memo } from 'react';

import Button from '../Button';
import CloseIcon from '../SVGIcons/CloseIcon';
import classes from './lection-over-content.module.scss';

interface ILessonCardProps {
  title: string;
  group: string;
  date: Date;
  studentsNum: number;
  checkedStudentsNum: number;
  onClose: () => void;
}

function LectionOverContent({
  title,
  group,
  date,
  studentsNum,
  checkedStudentsNum,
  onClose,
}: ILessonCardProps) {
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h2>{`Занятие: ${title}`}</h2>
        <div role="none" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <p>{`Группа: ${group}`}</p>
      <p>{`Дата занятия: ${moment(date).format('DD/MM/YYYY HH:MM')}`}</p>
      <p>{`Количество посетивших: ${checkedStudentsNum}/${studentsNum}`}</p>
      <div className={classes.buttonContainer}>
        <Button title="Загрузить отчет" isPrimary />
        <Button title="Синхронизация с LMS" isPrimary />
      </div>
    </div>
  );
}

export default memo(LectionOverContent);
