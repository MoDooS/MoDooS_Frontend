import { CreditRating } from '@/lib/creditRating';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

type UserInfoByIdResponse = {
  memberId: number;
  nickname: string;
  ranking: CreditRating;
  score: number;
  categoryList: [];
  heartCount: number;
  self: boolean;
};

export default function getUserInfoById(id?: string | number) {
  return modoosAxios.get<UserInfoByIdResponse>(`/api/member/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
