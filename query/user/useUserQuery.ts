import modoosAxios from '@/apis/modoosAxios';
import { CreditRating } from '@/lib/creditRating';
import { StudyCampus } from '@/types/studyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

type ResponseType = {
  memberId: number;
  nickname: string;
  email: string;
  campus: StudyCampus;
  department: string;
  ranking: CreditRating;
  score: number;
};

const fetchUser = async () => {
  return await modoosAxios.get(`/api/member/myInfo`);
};

export const USER_QUERY_KEY = 'useUserQuery';

export function useUserQuery() {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(USER_QUERY_KEY, fetchUser, {
    retry: 0,
    refetchOnWindowFocus: false, // 다른 창 갔다가 돌아올 경우 다시 요청할지
  });
  return { user: data?.data, isLoading, isError };
}
