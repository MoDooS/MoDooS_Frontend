import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type StartStudyReqBody = {
  id: number;
  start_at: string; // 스터디 시작일
  end_at: string; // 스터디 마감일
  studyTime: string; // 시작 시간
  endTime: string; // 종료 시간
  period: number; // 주기 (n주에 몇번)
  total_turn: number; // 총 몇회차
  absent: number;
  late: number;
  out: number;
  checkList: { id: number | null; content: string }[];
};

export default function startStudy(reqBody: StartStudyReqBody) {
  return modoosAxios.post<{ id: number }>('/api/study/create', reqBody, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
