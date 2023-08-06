import modoosAxios from '@/apis/modoosAxios';
import { CreditRating } from '@/lib/creditRating';
import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

type ResponseType = {
  id: number;
  leader_id: number;
  leader_nickname: string;
  leader_ranking: CreditRating;
  title: string;
  description: string;
  status: number;
  category: StudyCategory;
  campus: StudyCampus;
  recruits_count: number;
  participants_count: number;
  channel: StudyChannel;
  recruit_deadline: string;
  expected_start_at: string;
  expected_end_at: string;
  link: string | null;
  contact: string | null;
  checkList: [
    {
      id: number;
      content: string;
    },
    {
      id: number;
      content: string;
    },
    {
      id: number;
      content: string;
    },
  ];
  written: true;
};

const fetchRecruitDetail = async (id: string) => {
  return await modoosAxios.get(`/api/recruit/postInfo/${id}`);
};

export function useRecruitDetailQuery(id: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(
    ['useRecruitDetailQuery', id],
    () => fetchRecruitDetail(id),
    {
      retry: 1,
      refetchOnWindowFocus: false, // 다른 창 갔다가 돌아올 경우 다시 요청할지
    },
  );
  return { study: data?.data, isLoading, isError };
}
