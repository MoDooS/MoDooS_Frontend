import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';

export async function postLogout() {
  return await modoosAxios.post('/api/auth/logout');
}
