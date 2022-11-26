import { memo } from 'react';

import LessonCard from '../../LessonCard';
import styles from './teacher-page.module.scss';

const lessons = [
  {
    id: 1,
    title: 'Some para',
    date: new Date(2013, 0, 12),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(2025, 0, 20),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
  },
];

function TeacherPage() {
  fetch('https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?query=Пескова')
    .then((response) => response.json())
    .then((data) => console.log(data.table.table.slice(1)));
  return (
    <div className={styles.content}>
      <h1>Расписание занятий</h1>
      <div className={styles.cardsContainer}>
        {lessons.map((item) => (
          <LessonCard
            key={item.id}
            title={item.title}
            date={item.date}
            registrationTime={item.registrationTime}
            group={item.group}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(TeacherPage);
