import { CreditRating } from '@/lib/creditRating';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

type RankingResponse = {
  content: {
    rankingNumber: number;
    memberId: number;
    nickName: string;
    ranking: CreditRating;
    score: number;
  }[];
};

export default async function getRanking() {
  return await modoosAxios.get<RankingResponse>('/api/ranking', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
