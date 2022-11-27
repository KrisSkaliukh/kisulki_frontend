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
    title: 'Организационное и правовое обеспечение информационной безопасности',
    date: new Date(2022, 10, 21),
    registrationTime: 30,
    group: 'КТсо4-5',
    audience: 'LMS',
    teacher: 'Князева М. В.',
    isOnline: true,
  },
  {
    id: 1,
    title: 'Программно-аппаратная защита информации',
    date: new Date(2025, 0, 20),
    registrationTime: 30,
    group: 'КТсо4-5',
    audience: 'И-241',
    teacher: 'Бабенко Л. К.',
    isOnline: false,
  },
  {
    id: 1,
    title: 'Организационное и правовое обеспечение информационной безопасности',
    date: new Date(),
    registrationTime: 30,
    group: 'КТсо4-5',
    audience: 'LMS',
    teacher: 'Князева М. В.',
    isOnline: true,
  },
  {
    id: 1,
    title: 'Безопасность персональных и фискальных данных',
    date: new Date(),
    registrationTime: 30,
    group: 'КТсо4-5',
    audience: 'И-241',
    teacher: 'Басан А. С.',
    isOnline: false,
  },
  {
    id: 1,
    title: 'Криптографические протоколы и стандарты',
    date: new Date(),
    registrationTime: 30,
    group: 'КТсо4-5',
    audience: 'И-241',
    teacher: 'Пескова О. Ю.',
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

  const onActiveLessonClose = () => {
    setLectionOpen(false);
  };

  return (
    <div className={styles.content}>
      {isLectionOpen ? <Lection onClose={onActiveLessonClose} currentLesson={currentLesson} /> : (
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
