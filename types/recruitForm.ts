import { RecruitRequest } from './recruitRequest';

export interface RecruitFormType
  extends Omit<RecruitRequest, 'recruit_deadline' | 'expected_start_at' | 'expected_end_at'> {
  recruit_deadline: string | null; // 모집 마감일
  expected_start_at: string | null; // 스터디 예정 시작일
  expected_end_at: string | null; // 스터디 예정 마감일
}
