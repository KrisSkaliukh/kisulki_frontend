import api from './api';

async function sendCodeAPI(userId: any, lectureId: any, code: any) {
  const response = await api.post('register', {
    userId,
    lectureId,
    code,
  });
  return response.data;
}

export default sendCodeAPI;
