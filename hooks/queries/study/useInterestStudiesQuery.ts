import getInterestStudies from '@/apis/getInterestStudies';
import { useQuery } from 'react-query';

export const INTEREST_STUDIES_QUERY_KEY = 'InterestStudies';
export default function useInterestStudiesQuery() {
  const {
    data: studies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getInterestStudies,
    queryKey: INTEREST_STUDIES_QUERY_KEY,
    select: (res) => res.data.content,
  });
  return { studies, isLoading, isError };
}
