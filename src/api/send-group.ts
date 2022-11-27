import api from './api';

async function sendGroupAPI(userId: any, groupId: any) {
  const response = await api.patch(`/groups/${groupId}?userId=${userId}`);
  return response.data;
}

export default sendGroupAPI;
