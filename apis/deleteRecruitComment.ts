import modoosAxios from './modoosAxios';

export async function deleteRecruitComment(commentId: number) {
  return await modoosAxios.delete(`/api/comment/${commentId}`);
}
