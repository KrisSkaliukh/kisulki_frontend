import CircularProgress from '@mui/material/CircularProgress';
import { AuthResponse, UserAgentApplication } from 'msal';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { requestSetUser } from '../../redux/actions';
import { getScopes, getUserAgentApp } from '../../utils/authorization';
import classes from './login.module.scss';

function Login() {
  const [msalInstance, setMsalInstance] = useState<UserAgentApplication | undefined>(undefined);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setMsalInstance(getUserAgentApp({
      clientId: 'ff630e51-21e2-4078-8ec7-c2de9a9c9bc8',
      useLocalStorageCache: true,
      redirectUri: 'http://localhost:3000/userpage',
      postLogoutRedirectUri: 'http://localhost:3000/login',
    }));
  }, []);

  const scopes = getScopes();

  const redirectLogin = () => {
    msalInstance!.loginRedirect({ scopes });
  };

  const getUserData = async (authResponseWithAccessToken: AuthResponse) => {
    const { accessToken } = authResponseWithAccessToken;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(
      'https://graph.microsoft.com/v1.0/me',
      options,
    );
    const userData = await response.json();
    console.log(
      null,
      {
        ...userData,
        ...authResponseWithAccessToken,
      },
      msalInstance,
    );
    dispatch(requestSetUser({ ...userData, ...authResponseWithAccessToken }));
    navigate('/userPage');
  };

  const finalStep = (authResponseWithAccessToken: AuthResponse) => {
    getUserData(authResponseWithAccessToken);
  };

  const getGraphAPITokenAndUser = async () => {
    try {
      try {
        const silentRes = await msalInstance!.acquireTokenSilent({ scopes });
        finalStep(silentRes);
      } catch (err) {
        msalInstance!.acquireTokenRedirect({ scopes });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (msalInstance) {
      msalInstance!.handleRedirectCallback(
        (error: any, authResponse: any) => {
          if (!error && authResponse) {
            getGraphAPITokenAndUser();
            return undefined;
          } return undefined;
        },
      );
    }
  }, [msalInstance]);

  useEffect(() => {
    const clientToken = localStorage.getItem('msal.idtoken');

    if (clientToken && msalInstance) {
      getGraphAPITokenAndUser();
    } else if (msalInstance) {
      redirectLogin();
    }
  }, [msalInstance]);

  return (
    <div className={classes.loginContainer}>
      <CircularProgress />
    </div>
  );
}

export default memo(Login);
