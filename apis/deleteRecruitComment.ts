import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export async function deleteRecruitComment(commentId: number) {
  return await modoosAxios.delete(`/api/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
