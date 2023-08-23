import getAlarms from '@/apis/getAlarms';
import { withVerify } from '@/apis/withVerify';
import { useQuery } from 'react-query';

export const ALARMS_QUERY_KEY = 'AlarmsQuery';

export default function useAlarmsQuery() {
  const {
    data: alarms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ALARMS_QUERY_KEY,
    queryFn: () => withVerify(getAlarms),
    select: (res) => res.data.content,
  });
  return { alarms, isLoading, isError };
}
