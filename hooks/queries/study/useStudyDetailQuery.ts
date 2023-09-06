import { getStudyDetail } from '@/apis/getStudyDetail';
import { useQuery } from 'react-query';

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
    // staleTime: 1000 * 60 * 30, // 30분 캐시
    select: (res) => {
      const positiveTotal = res.data?.feedback.positiveList.reduce((a, b) => a + b.count, 0) ?? 0;
      const negativeTotal = res.data?.feedback.negativeList.reduce((a, b) => a + b.count, 0) ?? 0;
      // return res.data;
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
