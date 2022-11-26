/* eslint-disable no-param-reassign */
import {
  Checkbox,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';

import Button from '../Button';
import classes from './lection.module.scss';

interface ILectionProps {
  currentLesson: any;
}

const usersConstant = [
  {
    id: 1,
    displayName: 'Метус Максим',
    group: 'Группа 8 отдела',
    checked: true,
  },
  {
    id: 2,
    displayName: 'Скалиух Кристина',
    group: 'Группа 8 отдела',
    checked: true,
  },
  {
    id: 3,
    displayName: 'Смеловский Денис',
    group: 'Группа 8 отдела',
    checked: true,
  },
  {
    id: 4,
    displayName: 'Дима Пикара',
    group: 'Группа 8 отдела',
    checked: false,
  },
  {
    id: 5,
    displayName: 'Дима Пономарев',
    group: 'Группа 8 отдела',
    checked: false,
  },
];

const columns = ['Посещение', 'ФИО', 'Группа'];

function Lection({ currentLesson }: ILectionProps) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const onCheckedChange = (userId: number) => {
    setIsEditEnabled(true);
    setUsers(() => [...users.map((item: any) => {
      if (item.id === userId) {
        item.checked = !item.checked;
      }
      return item;
    })]);
  }

  useEffect(() => {
    setUsers(usersConstant);
  }, []);

  return (
    <div className={classes.content}>
      <h1>{currentLesson.title}</h1>
      <h2>Код лекции для отметки посещения: 123456</h2>
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
          {users.map((user: any) => (
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
        <Button title="Сохранить" disabled={!isEditEnabled} isPrimary />
      </div>
    </div>
  );
}

export default memo(Lection);
