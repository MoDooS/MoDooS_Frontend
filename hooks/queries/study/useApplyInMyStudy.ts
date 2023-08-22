import getApplyInMyStudy from '@/apis/getApplyInMyStudy';
import { authToken } from '@/class/authToken';
import { useQuery } from 'react-query';

export const All_APPLY_IN_MY_STUDY_QUERY_KEY = 'InterestStudies';
export default function useApplyInMyStudy() {
  const {
    data: applies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getApplyInMyStudy,
    queryKey: All_APPLY_IN_MY_STUDY_QUERY_KEY,
    select: (res) => res.data.content,
    enabled: !!authToken.getToken(),
  });
  return { applies, isLoading, isError };
}
