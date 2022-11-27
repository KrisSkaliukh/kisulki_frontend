import api from './api';

async function editLectureAPI(lectureId: any, lectureUsers: any) {
  const response = await api.put(`/lecture?=${lectureId}`, {
    lectureUsers,
  });
  return response.data;
}

export default editLectureAPI;
