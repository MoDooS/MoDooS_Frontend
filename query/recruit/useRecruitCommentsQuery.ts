import modoosAxios from '@/apis/modoosAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export type CommentType = {
  id: number;
  writerId: number | null;
  writerNickname: string | null;
  content: string;
  createDate: string;
  modifiedDate: string;
  studyId: number;
  children: CommentType[];
};

const fetchRecruitComments = async (recruitId: string) => {
  return await modoosAxios.get(`/api/comment/${recruitId}`);
};

export const RECRUIT_COMMENTS_QUERY_KEY = 'RecruitCommentsQuery';

export function useRecruitCommentsQuery(recruitId: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<CommentType[]>, AxiosError>(
    [RECRUIT_COMMENTS_QUERY_KEY, recruitId],
    () => fetchRecruitComments(recruitId),
  );
  return { comments: data?.data, isLoading, isError };
}
