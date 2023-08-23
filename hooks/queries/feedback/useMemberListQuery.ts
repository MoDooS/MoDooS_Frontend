import modoosAxios from '@/apis/modoosAxios';
import { authToken } from '@/class/authToken';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

export type TChecklist = {
  id: number;
  content: string;
};

type TParticipant = {
  attendanceList: string[];
  id: number;
  nickname: string;
  ranking: string;
  outCount: number;
};

type ResponseType = {
  id: number;
  turn: number;
  checklist: TChecklist[];
  participantResponseList: TParticipant[];
  leader: boolean;
};

const fetchMemberList = async (id: number, turn: number) => {
  return await modoosAxios.get(`/api/study/feedback/${id}/${turn}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
};

export function useMemberListQuery(id: number, turn: number) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(
    ['MemberListQuery', id, turn],
    () => fetchMemberList(id, turn),
    {
      enabled: !!id && !!turn,
    },
  );
  return { memberList: data?.data, isLoading, isError };
}
