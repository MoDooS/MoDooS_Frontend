import modoosAxios from '@/apis/modoosAxios';
import { LoginFormType } from './login';

export const fetchResetPassword = async (formData: LoginFormType) => {
  try {
    const res = await modoosAxios.post('/api/auth/changePw', formData);
    console.log('비밀번호 재설정 성공', res);
    return res.status;
  } catch (error) {
    console.log('로그인 요청에 실패했습니다.', error);
  }
};
