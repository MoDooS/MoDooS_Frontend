import { RecruitsParams, getRecruitList } from '@/apis/getRecruitList';
import { useInfiniteQuery, useQuery } from 'react-query';

export const RECRUITS_QUERY_KEY = 'recruitsQuery';

export function useRecruitsQuery(params: Omit<RecruitsParams, 'lastIndex'>) {
  const {
    data: recruitInfiniteData,
    isLoading,
    isError,
    fetchNextPage: getNextRecruits,
    isSuccess: getRecruitsIsSuccess,
    hasNextPage: getNextRecruitsIsPossible,
  } = useInfiniteQuery({
    queryKey: [RECRUITS_QUERY_KEY, params],
    queryFn: ({ pageParam = 0 }) => getRecruitList({ ...params, lastIndex: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPage.lastId + lastPage.size;
    },
    // staleTime: 1000 * 60 * 30, // 30분 동안 캐시
  });
  const recruitList = recruitInfiniteData?.pages.map((recruits) => recruits.content).flat();
  // console.log('recruitList:', recruitInfiniteData);
  return { recruitList, isLoading, isError, getNextRecruits, getRecruitsIsSuccess, getNextRecruitsIsPossible };
}
