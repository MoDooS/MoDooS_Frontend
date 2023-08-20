import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type ResponseType = {
  status: 'SUCCESS' | 'FAILED';
};

export async function postNewRecruitComment({ recruitId, content }: { recruitId: string; content: string }) {
  return await modoosAxios.post<ResponseType>(
    `/api/comment/${recruitId}`,
    { parentId: null, content },
    {
      headers: {
        Authorization: `Bearer ${authToken.getToken()}`,
      },
    },
  );
}
