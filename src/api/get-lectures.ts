import api from './api';

interface ITired {
  surname: any;
  groupId: any;
}

async function getLectures({ surname, groupId }: ITired) {
  const response = await api.get(`/lectures/${surname ? `teacher/${surname.split(' ')[0]}` : `student/${groupId}`}`);
  return response.data;
}

export default getLectures;
