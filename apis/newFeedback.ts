import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';
import { RecruitRequest } from '@/types/recruitRequest';

export type TFeedbackList = {
  id: number;
  participate: number;
  positive: string | null;
  negative: string | null;
  checkList: { id: number }[];
};

export type FeedbackRequest = {
  id: number;
  turn: number;
  feedbackList: TFeedbackList[];
};

export async function postFeedback(reqBody: FeedbackRequest) {
  return await modoosAxios.post<{ id: number }>('/api/recruit/post', reqBody, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
