import getUserInfoById from '@/apis/getUserInfoById';
import { withVerify } from '@/apis/withVerify';
import { useQuery } from 'react-query';

export const SPECIFIC_MEMBER_QUERY_KEY = 'SpecificMemberQuery';

export function useSpecificMemberQuery(id?: string | number) {
  const {
    data: member,
    isLoading,
    isError,
  } = useQuery({
    queryKey: SPECIFIC_MEMBER_QUERY_KEY,
    queryFn: () => withVerify(() => getUserInfoById(id)),
    select: (res) => res.data,
    staleTime: 1000 * 20, // 20초 동안 유효한 데이터
    enabled: !!id,
  });
  return { member, isLoading, isError };
}
