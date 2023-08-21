import modoosAxios from '@/apis/modoosAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { TChecklist } from '../feedback/useMemberListQuery';

type TChecklistDone = {
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

type TParticipant = {
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
  participantList: TParticipant[];
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
};

const fetchStudyDetail = async (id: string) => {
  return await modoosAxios.get(`api/study/${id}`);
};

export function useStudyDetailQuery(id: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(
    ['StudyDetailQuery', id],
    () => fetchStudyDetail(id),
    {
      enabled: !!id,
    },
  );
  console.log(data);
  return { studyDetail: data?.data, isLoading, isError };
}
