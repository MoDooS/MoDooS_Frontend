import { CreditRating } from '@/lib/creditRating';
import { StudyCampus } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

type UserResponse = {
  memberId: number;
  nickname: string;
  email: string;
  campus: StudyCampus;
  department: string;
  ranking: CreditRating;
  score: number;
};

export async function getUser() {
  return await modoosAxios.get<UserResponse>(`/api/member/myInfo`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
