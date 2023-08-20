import modoosAxios from './modoosAxios';
import { RecruitRequest } from '@/types/recruitRequest';

export async function postNewRecruit(reqBody: RecruitRequest) {
  return await modoosAxios.post<{ id: number }>('/api/recruit/post', reqBody);
}
