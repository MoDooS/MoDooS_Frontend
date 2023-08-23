import { getRecruitDetail } from '@/apis/getRecruitDetail';
import { CreditRating } from '@/lib/creditRating';
import { StudyCampus, StudyCategory, StudyChannel, StudyStatusType } from '@/types/studyInfo';
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
  status: StudyStatusType;
  category: StudyCategory;
  participants_count: number;
  checkList: { id: number; content: string }[];
  late: number;
  absent: number;
  out: number;
  written: boolean;
};

export const RECRUIT_DETAIL_QUERY_KEY = 'RecruitDetailQuery';

export function useRecruitDetailQuery(id: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<RecruitDetailResponse>, AxiosError>({
    queryKey: [RECRUIT_DETAIL_QUERY_KEY, id],
    queryFn: () => getRecruitDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30분 캐시
  });
  return { recruit: data?.data, isLoading, isError };
}
