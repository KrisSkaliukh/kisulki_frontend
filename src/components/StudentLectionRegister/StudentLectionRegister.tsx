import { TextField } from '@mui/material';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { requestCodeSend } from '../../redux/actions';
import Button from '../Button';
import CloseIcon from '../SVGIcons/CloseIcon';
import classes from './student-lection-register.module.scss';

interface ILessonCardProps {
  title: string;
  onClose: () => void;
  lectureId: any;
  userId: any;
}

function StudentLectionRegister({
  title,
  onClose,
  lectureId,
  userId,
}: ILessonCardProps) {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const onCodeSend = () => {
    dispatch(requestCodeSend({ userId, lectureId, code }));
  };

  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h2>{`Дисциплина: ${title}`}</h2>
        <div role="none" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <TextField
        label="Код лекции"
        className={classes.lectionCode}
        value={code}
        onChange={(event) => setCode(event.target.value)}
        sx={{
          width: { sm: 250, md: 350 },
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderColor: '#21BA72',
            },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              borderColor: '#21BA72',
            },
          },
        }}
      />
      <div className={classes.buttonContainer}>
        <Button onClick={onCodeSend} title="Зарегистрироваться" isPrimary />
      </div>
    </div>
  );
}

export default memo(StudentLectionRegister);
