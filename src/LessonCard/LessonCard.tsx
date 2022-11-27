import { useMediaQuery } from '@mui/material';
import moment from 'moment';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import Chip from '../components/Chip';
import FutureLectionContent from '../components/FutureLectionContent';
import LectionOverContent from '../components/LectionOverContent';
import Modal from '../components/Modal';
import StudentLectionRegister from '../components/StudentLectionRegister';
import { RootState } from '../redux/reducers/rootReducer';
import mediaQueries from '../utils/media-query/media-query';
import classes from './lesson-card.module.scss';

interface ILessonCardProps {
  title: string;
  date: Date;
  registrationTime: number;
  audience: string;
  group: string;
  onActiveLessonClick: (lesson: any) => void;
  teacher: string;
  code: string;
}

function LessonCard({
  title,
  date,
  registrationTime,
  group,
  onActiveLessonClick,
  audience,
  teacher,
  code,
}: ILessonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useMediaQuery(mediaQueries.mobile);

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
        onClick={() => {
          if (checkRegistrationStatus() === 'Регистрация продолжается' && !isStudent) {
            onActiveLessonClick({
              title,
              registrationTime,
              group,
              code,
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
          width={isMobile ? '90%' : '480px'}
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
        checkRegistrationStatus() === 'Регистрация продолжается'
          && (
            <Modal
              width={isMobile ? '90%' : '480px'}
              height="300px"
              renderContent={() => (
                <StudentLectionRegister
                  title={title}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            />
          )
      )}
    </>
  );
}

export default memo(LessonCard);
