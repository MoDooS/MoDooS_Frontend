import { CreditRating } from '@/lib/creditRating';
import { StudyCampus } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';

export type UserResponse = {
  memberId: number;
  nickname: string;
  email: string;
  campus: StudyCampus;
  department: string;
  ranking: CreditRating;
  score: number;
};

export async function getUser(accessToken: string | null) {
  return await modoosAxios.get<UserResponse>(`/api/member/myInfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
