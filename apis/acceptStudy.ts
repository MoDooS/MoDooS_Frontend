import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export default function acceptStudy(standbyId: number) {
  return modoosAxios.get(`/api/participant/accept/${standbyId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
