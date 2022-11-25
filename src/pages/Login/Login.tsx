import { memo } from 'react';
import MicrosoftLogin from 'react-microsoft-login';

import classes from './login.module.scss';

function Login() {
  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  return (
    <div className={classes.loginContainer}>
      <MicrosoftLogin clientId="test" authCallback={authHandler} />
    </div>
  );
}

export default memo(Login);
