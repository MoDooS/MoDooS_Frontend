import modoosAxios from '@/apis/modoosAxios';

export interface LoginFormType {
  email: string;
  password: string;
}

export const fetchLogin = async (formData: LoginFormType) => {
  try {
    const res = await modoosAxios.post('/api/auth/login', formData);
    return res.status;
  } catch (error) {
    console.log('로그인 요청에 실패했습니다.', error);
  }
};
