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

const getStudyDetail = async (id: string) => {
  return await modoosAxios.get<ResponseType>(`api/study/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
};

export const STUDY_DETAIL_QUERY_KEY = 'StudyDetailQuery';

export function useStudyDetailQuery(id: string) {
  const {
    data: ResponseType,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [STUDY_DETAIL_QUERY_KEY, id],
    queryFn: () => getStudyDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30분 캐시
    select: (res) => {
      const positiveTotal = res.data?.feedback.positiveList.reduce((a, b) => a + b.count, 0) ?? 0;
      const negativeTotal = res.data?.feedback.negativeList.reduce((a, b) => a + b.count, 0) ?? 0;
      return {
        ...res.data,
        positiveTotal,
        negativeTotal,
        positiveList: res.data?.feedback.positiveList.map((item) => ({
          ...item,
          ratio: item.count === 0 ? 0 : item.count / positiveTotal,
        })),
        negativeList: res.data?.feedback.negativeList.map((item) => ({
          ...item,
          ratio: item.count === 0 ? 0 : item.count / negativeTotal,
        })),
      };
    },
  });
  // console.log(data);
  return { studyDetail: ResponseType, isLoading, isError };
}
