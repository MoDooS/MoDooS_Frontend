import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export async function postEditRecruitComment({ commentId, content }: { commentId: number; content: string }) {
  return await modoosAxios.put(
    `/api/comment/${commentId}`,
    { parentId: null, content },
    {
      headers: {
        Authorization: `Bearer ${authToken.getToken()}`,
      },
    },
  );
}
