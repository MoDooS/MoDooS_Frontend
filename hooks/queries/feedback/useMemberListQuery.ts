import modoosAxios from '@/apis/modoosAxios';
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

const fetchMemberList = async (studyId: string, turn: string) => {
  return await modoosAxios.get(`/api/study/feedback/${studyId}/${turn}`);
};

export function useMemberListQuery(studyId: string, turn: string) {
  const { data, isLoading, isError } = useQuery<AxiosResponse<ResponseType>, AxiosError>(
    ['MemberListQuery', studyId, turn],
    () => fetchMemberList(studyId, turn),
    {
      enabled: !!studyId && !!turn,
    },
  );
  return { memberList: data?.data, isLoading, isError };
}
