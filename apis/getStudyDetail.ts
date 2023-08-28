import modoosAxios from '@/apis/modoosAxios';
import { TChecklist } from '@/hooks/queries/feedback/useMemberListQuery';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { authToken } from '@/class/authToken';

export type TChecklistDone = {
  id: number;
  content: string;
  check: boolean;
};

type TPositiveList = {
  count: number;
  positive: string;
};

type TNegativeList = {
  count: number;
  negative: string;
};

export type TParticipant = {
  attendanceList: string[];
  id: number;
  nickname: string;
  ranking: string;
  outCount: number;
};

type TFeedback = {
  times: number;
  checkList: TChecklistDone[];
  positiveList: TPositiveList[];
  negativeList: TNegativeList[];
};

type ResponseType = {
  id: number;
  memberId: number;
  title: string;
  description: string;
  participants_count: number;
  absent: number;
  late: number;
  out: number;
  start_at: string;
  end_at: string;
  studyTime: string;
  period: number;
  total_turn: number;
  checkList: TChecklist[];
  feedback: TFeedback;
  participantList: TParticipant[];
};

export const getStudyDetail = async (id: string) => {
  return await modoosAxios.get<ResponseType>(`api/study/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
};
