import './App.css';

import { AuthResponse, UserAgentApplication } from 'msal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/Login';
import UserPage from './pages/UserPage';
import { requestSetUser } from './redux/actions';
import { getScopes, getUserAgentApp } from './utils/authorization';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/userpage',
    element: <UserPage />,
  },
  {
    path: '*',
    element: <Login />,
  },
]);

function App() {
  const [msalInstance, setMsalInstance] = useState<UserAgentApplication | undefined>(undefined);

  const dispatch = useDispatch();

  const scopes = getScopes();

  useEffect(() => {
    setMsalInstance(getUserAgentApp({
      clientId: 'ff630e51-21e2-4078-8ec7-c2de9a9c9bc8',
      useLocalStorageCache: true,
      redirectUri: 'http://localhost:3000/userpage',
      postLogoutRedirectUri: 'http://localhost:3000/login',
    }));
  }, []);

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
        console.log('not silent');
        msalInstance!.acquireTokenRedirect({ scopes });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const clientToken = localStorage.getItem('msal.idtoken');

    if (clientToken && msalInstance) {
      getGraphAPITokenAndUser();
    } else if (!clientToken) {
      window.location.replace('/login');
    }
  }, [msalInstance]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
