import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export default function rejectStudy(studyId: number) {
  return modoosAxios.get(`/api/participant/reject/${studyId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
