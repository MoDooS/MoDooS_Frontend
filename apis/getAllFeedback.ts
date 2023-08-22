import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type AllFeedback = {
  id: number;
  nickname: string;
  positiveList: {
    count: number;
    positive: string;
  }[];
  negativeList: {
    count: number;
    negative: string;
  }[];
  self: boolean;
};

export default function getAllFeedback(userId?: number) {
  return modoosAxios.get<AllFeedback>(`/api/feedbacks/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
