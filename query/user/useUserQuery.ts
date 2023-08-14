import modoosAxios from '@/apis/modoosAxios';
import { CreditRating } from '@/lib/creditRating';
import { StudyCampus } from '@/types/studyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

type UserResponse = {
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
  const { data, isLoading, isError } = useQuery<AxiosResponse<UserResponse>, AxiosError>(USER_QUERY_KEY, fetchUser);
  return { user: data?.data, isLoading, isError };
}
