import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';
import { RecruitRequest } from '@/types/recruitRequest';

export async function editRecruit({ recruitId, reqBody }: { recruitId: number; reqBody: RecruitRequest }) {
  return await modoosAxios.put<{ id: number }>(`/api/recruit/${recruitId}`, reqBody, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
