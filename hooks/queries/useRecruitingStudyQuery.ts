import getRecruitingStudy from '@/apis/getRecruitingStudy';
import { withVerify } from '@/apis/withVerify';
import { useQuery } from 'react-query';

export const RECRUITING_STUDY_QUERY_KEY = 'RecruitingQuery';

export default function useRecruitingStudyQuery() {
  const {
    data: recruitingStudy,
    isLoading,
    isError,
  } = useQuery({
    queryKey: RECRUITING_STUDY_QUERY_KEY,
    queryFn: () => withVerify(getRecruitingStudy),
    select: (res) => res.data.content,
  });
  return { recruitingStudy, isLoading, isError };
}
