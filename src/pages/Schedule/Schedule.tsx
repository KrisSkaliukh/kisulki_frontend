import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import Lection from '../../components/Lection';
import Switch from '../../components/Switch';
import LessonCard from '../../LessonCard';
import { RootState } from '../../redux/reducers/rootReducer';
import styles from './schedule.module.scss';

const lessons = [
  {
    id: 1,
    title: 'Some para',
    date: new Date(2013, 0, 12),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'LMS',
    teacher: 'Доместус Моксем Игоревич',
    isOnline: true,
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(2025, 0, 20),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'Д-217',
    teacher: 'Смеловский Отцеслав Андреевич',
    isOnline: false,
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'Д-213',
    teacher: 'Дикара Пима Батькович',
    isOnline: false,
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'LMS',
    teacher: 'Смурфетова Кристиняо Олеговна',
    isOnline: true,
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'Д-342',
    teacher: 'Глазунова Катушка Олеговна',
    isOnline: false,
  },
  {
    id: 1,
    title: 'Some para',
    date: new Date(),
    registrationTime: 30,
    group: 'УЭбо2-7',
    audience: 'Д-217',
    teacher: 'Ручеренко Кома Александрович',
    isOnline: false,
  },
];

function Schedule() {
  const [activeOption, setActiveOption] = useState('left');
  // const [modeLessons, setModeLessons] = useState('offline');

  const user = useSelector<RootState, any>((state) => state.mainReducer.user);
  const isStudent = user.user.role === 'student';

  // console.log(i);
  // console.log(i.audience.toLowerCase().includes('lms'));

  const handleSwitchOption = (option: string) => {
    if (option === 'left') return setActiveOption('right');
    return setActiveOption('left');
  };

  const [isLectionOpen, setLectionOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  const onActiveLessonClick = (lesson: any) => {
    setLectionOpen(true);
    setCurrentLesson(lesson);
  };

  return (
    <div className={styles.content}>
      {isLectionOpen ? <Lection currentLesson={currentLesson} /> : (
        <>
          <div className={styles.title}>
            <h1>Расписание занятий</h1>
            {isStudent
      && (
      <Switch
        activeOption={activeOption}
        onChange={() => handleSwitchOption(activeOption)}
      />

      )}
          </div>
          <div className={styles.cardsContainer}>
            {lessons
              .filter((i: any) => (activeOption === 'left' ? !i.isOnline : i.isOnline))
              .map((item) => (
                <LessonCard
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  registrationTime={item.registrationTime}
                  group={item.group}
                  audience={item.audience}
                  teacher={item.teacher}
                  onActiveLessonClick={onActiveLessonClick}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Schedule);
