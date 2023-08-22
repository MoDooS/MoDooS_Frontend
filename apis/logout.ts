import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

export async function postLogout() {
  return await modoosAxios.post(
    '/api/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken.getToken()}`,
      },
    },
  );
}
