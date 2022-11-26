/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as chrono from 'chrono-node';
import {
  put,
  takeLatest,
} from 'redux-saga/effects';

import { takeTime } from '../../utils/takeTime';
import { receiveGetSchedule, rejectGetSchedule, requestGetSchedule } from '../actions';

const getSchedule = function* getSchedule() {
  try {
    const lessons: any = [];
    yield fetch('https://cors-everywhere.herokuapp.com/http://165.22.28.187/schedule-api/?group=140.htm&week=14')
      .then((response) => response.json())
      .then((data) => data.table.table.slice(2).map((item: any) => {
        console.log(data.table.table.slice(2));
        item.map((lesson: any, lessonIndex: any) => {
          if (lessonIndex !== 0 && lesson) {
            lessons.push({
              title: lesson,
              isOnline: lesson.includes('LMS' || 'Teams'),
              date: chrono.ru.parseDate(
                `${item[0].split(',')[1].slice(0, 3)
                + item[0].split(',')[1].slice(4)
                },${
                  takeTime(lessonIndex)}`,
              ),
              teacher: lesson.split(' ').reduce((acc: any, element: any, index: any) => {
                if (element.includes('.') && element.length === 2 && !acc) {
                  return `${lesson.split(' ')[index - 1]} ${element}${lesson.split(' ')[index + 1]}`;
                }
                return acc;
              }, ''),
            });
          }
          return undefined;
        });
        return undefined;
      }));
    console.log(lessons);
    yield put(receiveGetSchedule({ lessons }));
  } catch (error) {
    console.log(error);
    yield put(rejectGetSchedule({ error }));
  }
};

export default function* getScheduleWatcher() {
  yield takeLatest(requestGetSchedule, getSchedule);
}
