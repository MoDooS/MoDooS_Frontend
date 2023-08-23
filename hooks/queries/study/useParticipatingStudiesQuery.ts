import getMyStudies from '@/apis/getMyStudies';
import getParticipatingStudies from '@/apis/getParticipatingStudies';
import { StudyStatusType } from '@/types/studyInfo';
import { useQuery } from 'react-query';

export const PARTICIPATING_STUDIES_QUERY_KEY = 'ParticipatingStudiesQuery';
export default function useParticipatingStudiesQuery(status: StudyStatusType | '전체') {
  const {
    data: studies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getParticipatingStudies(status),
    queryKey: [PARTICIPATING_STUDIES_QUERY_KEY, status],
    select: (res) => res.data.content,
  });
  return { studies, isLoading, isError };
}
