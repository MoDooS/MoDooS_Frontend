import { StudyCampus, StudyCategory, StudyChannel } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';

export type NewRecruitRequestType = {
  campus: StudyCampus; // 캠퍼스
  recruits_count: number; // 모집 인원
  channel: StudyChannel; // 스터디 진행 방식
  category: StudyCategory; // 카테고리
  recruit_deadline: string; // 모집 마감일
  expected_start_at: string; // 스터디 예정 시작일
  expected_end_at: string; // 스터디 예정 마감일
  contact: string | null; // 연락 방법
  link: string | null; // 연락 방법 링크
  late: number; // 지각 몇 번이면 1결석
  absent: number; // 결석 몇 번이면 1아웃
  out: number; // 아웃 몇 번이면 퇴출
  checkList: string[]; // 체크리스트
  rule_content: string | null; // 자율 규칙
  title: string; // 스터디 소개글 (제목)
  description: string; // 스터디 소개글 (내용)
};

type ResponseType = {
  id: number;
};

export async function postNewRecruit(reqBody: NewRecruitRequestType) {
  return await modoosAxios.post<ResponseType>('/api/recruit/post', reqBody);
}
