import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export default function getMyStudies() {
  return modoosAxios.get('/api/recruit/my', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
