import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import moment from 'moment';
import { memo, useState } from 'react';

import Button from '../Button';
import CloseIcon from '../SVGIcons/CloseIcon';
import classes from './future-lection-content.module.scss';

interface IFutureLectionContentProps {
  title: string;
  group: string;
  date: Date;
  onClose: () => void;
  registrationTime: number;
}

function FutureLectionContent({
  title,
  group,
  date,
  onClose,
  registrationTime,
}: IFutureLectionContentProps) {
  const [dateValue, setDateValue] = useState<Date | null>(date);
  const [registrationDuration, setRegistrationDuration] = useState(registrationTime);
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h2>{`Занятие: ${title}`}</h2>
        <div role="none" onClick={onClose}>
          <CloseIcon />
        </div>
      </div>
      <p>{`Группа: ${group}`}</p>
      <div className={classes.datePickerContainer}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            label={`Дата занятия: ${moment(date).format('DD/MM/YYYY HH:MM')}`}
            value={dateValue}
            onChange={(value) => setDateValue(value)}
            renderInput={(params) => (
              <TextField
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
                {...params}
              />
            )}
            ampm={false}
          />
        </LocalizationProvider>
      </div>
      <TextField
        label="Длительность регистрации на занятие"
        value={registrationDuration}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onChange={(event) => setRegistrationDuration(Number(event.target.value))}
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
        <Button title="Отмена" onClick={onClose} isPrimary={false} />
        <Button
          title="Редактировать занятие"
          isPrimary
          disabled={dateValue === date && registrationDuration === registrationTime}
        />
      </div>
    </div>
  );
}

export default memo(FutureLectionContent);
