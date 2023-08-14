import modoosAxios from './modoosAxios';
import { RecruitRequest } from '@/types/recruitRequest';

export async function editNewRecruit({ recruitId, reqBody }: { recruitId: number; reqBody: RecruitRequest }) {
  return await modoosAxios.put<{ id: number }>(`/api/recruit/${recruitId}`, reqBody);
}
