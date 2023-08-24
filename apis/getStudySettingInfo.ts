// 스터디 생성 전 이전 공고에서 작성한 내용 조회

import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

type StudySettingInfoResponse = {
  id: number;
  title: string;
  expected_start_at: string;
  expected_end_at: string;
  checkList: {
    id: number;
    content: string;
  }[];
  absent: number;
  late: number;
  out: number;
};

export default function getStudySettingInfo(studyId: number | string | undefined) {
  return modoosAxios.get<StudySettingInfoResponse>(`api/study/create/${studyId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
