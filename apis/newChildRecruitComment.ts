import modoosAxios from './modoosAxios';

type ResponseType = {
  status: 'SUCCESS' | 'FAILED';
};

export async function postNewChildRecruitComment({
  recruitId,
  parentId,
  content,
}: {
  recruitId: string;
  parentId: number;
  content: string;
}) {
  return await modoosAxios.post<ResponseType>(`/api/comment/${recruitId}`, { parentId, content });
}
