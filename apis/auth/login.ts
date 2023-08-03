import modoosAxios from '@/apis/modoosAxios';

export interface LoginFormType {
  email: string;
  password: string;
}

export const fetchLogin = async (formData: LoginFormType) => {
  try {
    console.log('로그인시도');
    const res = await modoosAxios.post('/api/auth/login', formData);
    console.log('로그인 확인', res);
    return res.status;
  } catch (error) {
    console.log('로그인 요청에 실패했습니다.', error);
  }
};
