import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export default function acceptStudy(studyId: number) {
  return modoosAxios.get(`/api/participant/accept/${studyId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
