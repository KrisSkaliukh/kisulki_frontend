import api from './api';

async function archiveRequest(user: any) {
  const response = await api.post(
    '/auth/create',
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
    },
    {
      headers: {
        Authorization: user.token,
      },
    },
  );
  return response.data;
}

export default archiveRequest;
