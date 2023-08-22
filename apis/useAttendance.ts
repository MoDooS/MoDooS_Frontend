import modoosAxios from '@/apis/modoosAxios';

type TAttendance = {
  id: number;
  attendance: string;
};

export type RequestType = {
  attendanceList: TAttendance[];
};

type ResponseType = {
  id: number;
};

export const postAttendance = async ({ id, reqBody }: { id: number; reqBody: RequestType }) => {
  return await modoosAxios.post<ResponseType>(`api/study/attend/${id}`, reqBody);
};
