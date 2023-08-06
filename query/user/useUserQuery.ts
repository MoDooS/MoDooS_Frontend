import modoosAxios from '@/apis/modoosAxios';
import { CreditRating } from '@/lib/creditRating';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

type ResponseType = {
  nickname: string;
  email: string;
  campus: '인문' | '자연' | '공통';
  department: string;
  ranking: CreditRating;
  score: number;
};

const fetchUser = async () => {
  return await modoosAxios.get(`/api/member/myInfo`);
};

export function useUserQuery() {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>('useUserQuery', fetchUser, {
    retry: 0,
    refetchOnWindowFocus: false, // 다른 창 갔다가 돌아올 경우 다시 요청할지
  });
  return { user: data?.data, isLoading, isError };
}
