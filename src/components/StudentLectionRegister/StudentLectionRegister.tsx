import { TextField } from '@mui/material';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { requestCodeSend } from '../../redux/actions';
import Button from '../Button';
import CloseIcon from '../SVGIcons/CloseIcon';
import classes from './student-lection-register.module.scss';

interface ILessonCardProps {
  title: string;
  onClose: () => void;
}

function StudentLectionRegister({
  title,
  onClose,
}: ILessonCardProps) {
  // const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const handleInput = (value: any) => {
    console.log(value);
  };

  const onCodeSend = () => {
    dispatch(requestCodeSend());
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
        onChange={(value) => handleInput(value)}
        className={classes.lectionCode}
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
