import modoosAxios from '@/apis/modoosAxios';
import { CreditRating } from '@/lib/creditRating';
import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

type RecruitDetailResponse = {
  id: number;
  campus: StudyCampus;
  recruits_count: number;
  channel: StudyChannel;
  recruit_deadline: string;
  expected_start_at: string;
  expected_end_at: string;
  contact: string | null;
  link: string | null;
  leader_id: number;
  leader_nickname: string;
  leader_ranking: CreditRating;
  title: string;
  description: string;
  status: number;
  category: StudyCategory;
  participants_count: number;
  checkList: { id: number; content: string }[];
  late: number;
  absent: number;
  out: number;
  written: boolean;
};

const fetchRecruitDetail = async (id: string) => {
  return await modoosAxios.get(`/api/recruit/postInfo/${id}`);
};

export function useRecruitDetailQuery(id: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<RecruitDetailResponse>, AxiosError>(
    ['RecruitDetailQuery', id],
    () => fetchRecruitDetail(id),
    {
      enabled: !!id,
    },
  );
  return { recruit: data?.data, isLoading, isError };
}
