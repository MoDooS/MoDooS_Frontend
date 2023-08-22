import getMyStudies from '@/apis/getMyStudies';
import { useQuery } from 'react-query';

export const MY_STUDIES_QUERY_KEY = 'MrStudies';
export default function useMyStudiesQeury() {
  const {
    data: studies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getMyStudies,
    queryKey: MY_STUDIES_QUERY_KEY,
    select: (res) => res.data.content,
  });
  return { studies, isLoading, isError };
}
