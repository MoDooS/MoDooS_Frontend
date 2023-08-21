import { authToken } from '@/class/authToken';
import modoosAxios from './modoosAxios';

// hearted 값이 true 이면 관심 스터디 등록, false 이면 관심 스터디 해제
export default function heartRecruit(recruitId: number) {
  return modoosAxios.get<{ studyId: number; memberId: number; hearted: boolean }>(`api/heart/${recruitId}`, {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
