import api from './api';

async function exportAPI() {
  const response = await api.get('/lectures/export');
  const link = document.createElement('a');
  link.href = `data:application/csv;base64,${response.data.csv}`;
  link.setAttribute('download', 'log.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  return response.data;
}

export default exportAPI;
