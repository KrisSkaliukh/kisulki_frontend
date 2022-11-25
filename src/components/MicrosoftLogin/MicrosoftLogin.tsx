import { AuthError, AuthResponse, UserAgentApplication } from 'msal';
import { memo, useEffect } from 'react';

import {
  checkToIE, getScopes,
} from '../../utils/authorization';
import MicrosoftLoginButton from '../MicrosoftLoginButton';

interface MicrosoftLoginProps {
  authCallback: (
    error: AuthError | null,
    result?: any,
    instance?: UserAgentApplication
  ) => void;
  graphScopes?: string[];
  withUserData?: boolean;
  useLocalStorageCache?: boolean;
  msalInstance: UserAgentApplication | undefined
}

function MicrosoftLogin({
  graphScopes,
  withUserData = false,
  authCallback,
  useLocalStorageCache,
  msalInstance,
}: MicrosoftLoginProps) {
  const scopes = getScopes(graphScopes);

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
    authCallback(
      null,
      {
        ...userData,
        ...authResponseWithAccessToken,
      },
      msalInstance,
    );
  };

  const finalStep = (authResponseWithAccessToken: AuthResponse) => {
    if (withUserData) {
      getUserData(authResponseWithAccessToken);
    } else {
      authCallback(null, authResponseWithAccessToken, msalInstance);
    }
  };

  const getGraphAPITokenAndUser = async (isRedirect?: boolean) => {
    try {
      try {
        const silentRes = await msalInstance!.acquireTokenSilent({ scopes });
        finalStep(silentRes);
      } catch (err) {
        if (isRedirect) {
          msalInstance!.acquireTokenRedirect({ scopes });
        } else {
          const popupRes = await msalInstance!.acquireTokenPopup({ scopes });
          finalStep(popupRes);
        }
      }
    } catch (error: any) {
      authCallback(error);
    }
  };

  const popupLogin = async () => {
    try {
      if (msalInstance) {
        await msalInstance!.loginRedirect({ scopes });
        await getGraphAPITokenAndUser();
      }
    } catch (err: any) {
      authCallback(err);
    }
  };

  const login = () => {
    if (checkToIE()) {
      redirectLogin();
    } else {
      popupLogin();
    }
  };

  useEffect(() => {
    if (msalInstance) {
      msalInstance!.handleRedirectCallback(
        (error: any, authResponse: any) => {
          if (!error && authResponse) {
            getGraphAPITokenAndUser(true);
          } else {
            authCallback(error);
          }
        },
      );
    }
  }, [msalInstance]);

  useEffect(() => {
    const clientToken = useLocalStorageCache
      ? localStorage.getItem('msal.idtoken')
      : sessionStorage.getItem('msal.idtoken');

    if (clientToken) {
      getGraphAPITokenAndUser(checkToIE());
    }
  }, [msalInstance]);

  return (
    <MicrosoftLoginButton
      buttonTheme="light"
      onClick={login}
    />
  );
}

export default memo(MicrosoftLogin);
