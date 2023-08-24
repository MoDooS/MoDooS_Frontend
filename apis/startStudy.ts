import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type StartStudyReqBody = {
  id: number;
  start_at: string;
  end_at: string;
  studyTime: string;
  endTime: string;
  period: number;
  total_turn: number;
  absent: number;
  late: number;
  out: number;
};

export default function startStudy(reqBody: StartStudyReqBody) {
  return modoosAxios.post('/api/study/create', reqBody, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
