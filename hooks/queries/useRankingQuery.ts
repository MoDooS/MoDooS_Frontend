import getRanking from '@/apis/getRanking';
import { withVerify } from '@/apis/withVerify';
import { useQuery } from 'react-query';

export const RANKING_QUERY_KEY = 'RankingQuery';

export default function useRankingQuery() {
  const {
    data: ranking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: RANKING_QUERY_KEY,
    queryFn: () => withVerify(getRanking),
    select: (res) => res.data.content,
  });
  return { ranking, isLoading, isError };
}
