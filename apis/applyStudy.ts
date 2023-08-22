import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export default function applyStudy(studyId: number) {
  return modoosAxios.get(`api/participant/apply/${studyId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
