import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

export const getRecruitDetail = async (id: string) => {
  return await modoosAxios.get(`/api/recruit/postInfo/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
};
