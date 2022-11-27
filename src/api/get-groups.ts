import api from './api';

async function getGroupAPI() {
  const response = await api.get('/groups');
  return response.data;
}

export default getGroupAPI;
