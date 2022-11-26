import moment from 'moment';
import { memo, useState } from 'react';

import Chip from '../components/Chip';
import FutureLectionContent from '../components/FutureLectionContent';
import LectionOverContent from '../components/LectionOverContent';
import Modal from '../components/Modal';
import classes from './lesson-card.module.scss';

interface ILessonCardProps {
  title: string;
  date: Date;
  registrationTime: number;
  group: string;
  onActiveLessonClick: (lesson: any) => void;
}

function LessonCard({
  title,
  date,
  registrationTime,
  group,
  onActiveLessonClick,
}: ILessonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        onClick={() => {
          if (checkRegistrationStatus() === 'Регистрация продолжается') {
            onActiveLessonClick({
              title,
              registrationTime,
              group,
            });
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        <div className={classes.title}>
          <h2>{title}</h2>
        </div>
        <div className={classes.content}>
          <p>{`Группа: ${group}`}</p>
          <p>{`Дата занятия: ${moment(date).format('DD/MM/YYYY HH:MM')}`}</p>
          <Chip
            title={checkRegistrationStatus()}
            color={checkChipColor(checkRegistrationStatus())}
            textColor={checkTextColor(checkRegistrationStatus())}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          width="480px"
          height={checkRegistrationStatus() === 'Регистрация окончена' ? '300px' : '400px'}
          renderContent={() => (checkRegistrationStatus() === 'Регистрация окончена'
            ? (
              <LectionOverContent
                title={title}
                group={group}
                date={date}
                studentsNum={25}
                checkedStudentsNum={20}
                onClose={() => setIsModalOpen(false)}
              />
            )
            : (
              <FutureLectionContent
                date={date}
                title={title}
                group={group}
                onClose={() => setIsModalOpen(false)}
                registrationTime={registrationTime}
              />
            ))}
        />
      )}
    </>
  );
}

export default memo(LessonCard);
