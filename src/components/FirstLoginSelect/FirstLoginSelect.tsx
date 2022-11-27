import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestGetGroups, requestGroupSend } from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import Button from '../Button';
import classes from './first-login-select.module.scss';

function FirstLoginSelect() {
  const groups = useSelector<RootState, any>((state) => state.mainReducer.groups);
  const userId = useSelector<RootState, any>((state) => state.mainReducer.user.user.id);
  const isLoading = useSelector<RootState, any>((state) => state.mainReducer.isLoading);

  const [groupValue, setGroupValue] = useState<any>(null);
  const [groupValueId, setGroupValueId] = useState<any>(null);

  const dispatch = useDispatch();

  const onGroupSend = () => {
    dispatch(requestGroupSend({ userId, groupId: groupValueId }));
  };

  useEffect(() => {
    dispatch(requestGetGroups());
  }, []);

  return (
    <div className={classes.container}>
      {isLoading ? <CircularProgress />
        : (
          <>
            <h1>Введите вашу группу</h1>
            <Autocomplete
              options={groups.map((item: any) => item.title)}
              value={groupValue}
              onChange={(event, value) => {
                const newValue = groups.find((item: any) => item.title === value);
                setGroupValue(newValue.title);
                setGroupValueId(newValue.id);
              }}
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
            />
            <Button disabled={!groupValueId && !groupValue} title="Отправить" onClick={onGroupSend} isPrimary />
          </>
        )}
    </div>
  );
}

export default memo(FirstLoginSelect);
