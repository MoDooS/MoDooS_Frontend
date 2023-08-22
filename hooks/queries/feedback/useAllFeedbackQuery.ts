import getAllFeedback from '@/apis/getAllFeedback';
import getInterestStudies from '@/apis/getInterestStudies';
import { useQuery } from 'react-query';
import { useUserQuery } from '../user/useUserQuery';
import round from '@/utils/round';

export const ALL_FEEDBACK_QUERY_KEY = 'AllFeedback';
export default function useAllFeedback() {
  const { user } = useUserQuery();
  const {
    data: allFeedback,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllFeedback(user?.memberId),
    queryKey: ALL_FEEDBACK_QUERY_KEY,
    select: (res) => {
      // const positiveTotal = res.data.positiveList.reduce((a, b) => a + b.count, 0);
      // const negativeTotal = res.data.negativeList.reduce((a, b) => a + b.count, 0);
      const positiveTotal = 100;
      const negativeTotal = 100;
      return {
        ...res.data,
        positiveTotal,
        negativeTotal,
        positiveList: res.data.positiveList
          .sort((a, b) => b.count - a.count)
          // .map((item) => ({ ...item, ratio:item.count === 0 ? 0 : item.count / positiveTotal })),
          .map((item) => ({ ...item, ratio: round((Math.random() * 100) / positiveTotal, 2) })),
        negativeList: res.data.negativeList
          .sort((a, b) => b.count - a.count)
          // .map((item) => ({ ...item, ratio:item.count === 0 ? 0 : item.count / negativeTotal })),
          .map((item) => ({ ...item, ratio: (Math.random() * 100) / negativeTotal })),
      };
    },
    enabled: !!user,
  });
  return { allFeedback, isLoading, isError };
}
