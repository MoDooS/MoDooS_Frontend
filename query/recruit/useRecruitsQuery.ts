import modoosAxios from '@/apis/modoosAxios';
import { StudyCategory } from '@/types/studyInfo';
import { StudySortingMethod } from '@/types/studyParams';
import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

type StudyStatus = '모집 중' | '모집 마감';

export const studyStatusMapping: StudyStatus[] = ['모집 중', '모집 마감'];

export type StudyInfo = {
  id: number;
  leader_id: number;
  leader_nickname: string;
  leader_ranking: string;
  title: string;
  status: number;
  category: StudyCategory;
  recruits_count: number;
  participants_count: number;
  recruit_deadline: string;
};

type ResponseType = {
  content: StudyInfo[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

type RecruitsParams = {
  categories: StudyCategory[];
  sort: StudySortingMethod;
  searchBy?: string;
};

const fetchRecruits = async (recruitsParams: RecruitsParams) => {
  const { categories, sort, searchBy } = recruitsParams;
  const params = {
    category: categories.length && categories[0] === 'ALL' ? '' : categories.join(','),
    sort: sort === 'recent' ? '' : sort,
  };
  console.log(params);
  return await modoosAxios.get('/api/recruit/posts', { params });
};

export function useRecruitsQuery(
  params: RecruitsParams,
  options?: UseQueryOptions<AxiosResponse<ResponseType>, AxiosError>,
) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(
    ['useRecruitsQuery', params],
    () => fetchRecruits(params),
    {
      ...options,
      retry: 1,
      refetchOnWindowFocus: false, // 다른 창 갔다가 돌아올 경우 다시 요청할지
    },
  );
  return { studies: data?.data, isLoading, isError };
}
