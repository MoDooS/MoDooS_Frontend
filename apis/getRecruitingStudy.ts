import { CreditRating } from '@/lib/creditRating';
import { StudyCategory, StudyStatusType } from '@/types/studyInfo';
import modoosAxios from './modoosAxios';
import { authToken } from '@/class/authToken';

type RecruitingStudyResponse = {
  content: {
    id: number;
    leader_id: number;
    leader_nickname: string;
    leader_ranking: CreditRating;
    title: string;
    status: StudyStatusType;
    category: StudyCategory;
    recruits_count: number;
    participants_count: number;
    recruit_deadline: string;
    heart: boolean;
  }[];
};

// 모집 중인 스터디
export default function getRecruitingStudy() {
  return modoosAxios.get<RecruitingStudyResponse>('/api/recruit/my-recruit', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
