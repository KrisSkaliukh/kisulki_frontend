import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/Login';
import UserPage from './pages/UserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/userpage',
    element: <UserPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
