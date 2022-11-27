/* eslint-disable no-param-reassign */
import {
  Checkbox,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestLectureEdit, requestUsers } from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import Button from '../Button';
import classes from './lection.module.scss';

interface ILectionProps {
  currentLesson: any;
  onClose: any;
}

const rows = [
  {
    id: 1,
    checked: true,
    displayName: 'Метус Максим Игоревич',
    group: 'КТсо4-5',
  },
];

const columns = ['Посещение', 'ФИО', 'Группа'];

function Lection({ currentLesson, onClose }: ILectionProps) {
  const lectureUsers = useSelector<RootState, any>((state) => state.mainReducer.lectureUsers.users);

  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const dispatch = useDispatch();

  const onCheckedChange = (userId: number) => {
    setIsEditEnabled(true);
    setUsers(() => [...users.map((item: any) => {
      if (item.id === userId) {
        return ({
          ...item,
          checked: !item.checked,
        });
      }
      return item;
    })]);
  };

  useEffect(() => {
    dispatch(requestUsers({ id: currentLesson.id }));
  }, []);

  useEffect(() => {
    if (lectureUsers) {
      setUsers(lectureUsers);
    }
  }, [lectureUsers]);

  const onEdit = () => {
    dispatch(requestLectureEdit({ lectionId: currentLesson.id, lectureUsers: users }));
  };

  return (
    <div className={classes.content}>
      <h1>{currentLesson.title}</h1>
      <h2>{`Код лекции для отметки посещения: ${currentLesson.code}`}</h2>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((item: any) => (
              <TableCell>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user: any) => (
            <TableRow>
              <TableCell>
                <Checkbox checked={user.checked} onChange={() => onCheckedChange(user.id)} />
              </TableCell>
              <TableCell>
                {user.displayName}
              </TableCell>
              <TableCell>
                {user.group}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.button}>
        <Button onClick={onClose} title="Назад" isPrimary={false} />
        <Button onClick={onEdit} title="Сохранить" disabled={!isEditEnabled} isPrimary />
      </div>
    </div>
  );
}

export default memo(Lection);
