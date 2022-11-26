import moment from 'moment';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import Chip from '../components/Chip';
import FutureLectionContent from '../components/FutureLectionContent';
import LectionOverContent from '../components/LectionOverContent';
import Modal from '../components/Modal';
import { RootState } from '../redux/reducers/rootReducer';
import classes from './lesson-card.module.scss';

interface ILessonCardProps {
  title: string;
  date: Date;
  registrationTime: number;
  audience: string;
  group: string;
  teacher: string;
}

function LessonCard({
  title,
  date,
  registrationTime,
  group,
  audience,
  teacher,
}: ILessonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector<RootState, any>((state) => state.mainReducer.user);
  const isStudent = user.user.role === 'student';

  const checkRegistrationStatus = () => {
    if (moment(date).isAfter(new Date())) {
      return 'Регистрация не начата';
    }
    if (moment(date).add(registrationTime, 'm').isAfter(new Date()) && moment(date).isBefore(new Date())) {
      return 'Регистрация продолжается';
    }
    return 'Регистрация окончена';
  };

  const checkChipColor = (status: string) => {
    if (status === 'Регистрация не начата') {
      return '#fff7e9';
    }
    if (status === 'Регистрация окончена') {
      return '#fef2f2';
    }
    return '#ecfdf5';
  };

  const checkTextColor = (status: string) => {
    if (status === 'Регистрация не начата') {
      return '#d29430';
    }
    if (status === 'Регистрация окончена') {
      return '#ef4444';
    }
    return '#059669';
  };

  return (
    <>
      <div
        className={classes.card}
        role="none"
        onClick={() => setIsModalOpen(true)}
      >
        <div className={classes.title}>
          <h2>{title}</h2>
        </div>
        <div className={classes.content}>
          {isStudent && <p>{`Преподаватель: ${teacher}`}</p>}
          {!isStudent && <p>{`Группа: ${group}`}</p>}
          <p>{`Аудитория: ${audience}`}</p>
          <p>{`Дата занятия: ${moment(date).format('DD/MM/YYYY HH:MM')}`}</p>
          <Chip
            title={checkRegistrationStatus()}
            color={checkChipColor(checkRegistrationStatus())}
            textColor={checkTextColor(checkRegistrationStatus())}
          />
        </div>
      </div>
      {isModalOpen && !isStudent && (
        <Modal
          width="480px"
          height={checkRegistrationStatus() === 'Регистрация окончена' ? '400px' : '500px'}
          renderContent={() => (checkRegistrationStatus() === 'Регистрация окончена'
            ? (
              <LectionOverContent
                title={title}
                date={date}
                studentsNum={25}
                checkedStudentsNum={20}
                onClose={() => setIsModalOpen(false)}
                group={group}
                audience={audience}
              />
            )
            : (
              <FutureLectionContent
                date={date}
                title={title}
                onClose={() => setIsModalOpen(false)}
                registrationTime={registrationTime}
                group={group}
                audience={audience}
              />
            ))}
        />
      )}
      {isModalOpen && isStudent && (
        <Modal
          width="480px"
          height={checkRegistrationStatus() === 'Регистрация окончена' ? '300px' : '400px'}
          renderContent={() => (checkRegistrationStatus() === 'Регистрация окончена'
            ? ( // курсор блок, убрать ховер и модалку не открывать
              <LectionOverContent
                title={title}
                date={date}
                studentsNum={25}
                checkedStudentsNum={20}
                onClose={() => setIsModalOpen(false)}
                group={group}
                audience={audience}
              />
            )
            : ( // рега на пользователя, если нет - красный инпут, если да - "Посещение защитано" на поповере
              <FutureLectionContent
                date={date}
                title={title}
                onClose={() => setIsModalOpen(false)}
                registrationTime={registrationTime}
                group={group}
                audience={audience}
              />
            ))}
        />
      )}
    </>
  );
}

export default memo(LessonCard);
