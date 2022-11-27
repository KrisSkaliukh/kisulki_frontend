import api from './api';

interface ITired {
  lectureId: string;
}

async function getUsersAPI({ lectureId }: ITired) {
  const response = await api.get(`users/user-lectures/${lectureId}`);
  return response.data;
}

export default getUsersAPI;
