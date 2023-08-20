import modoosAxios from '@/apis/modoosAxios';

export interface LoginFormType {
  email: string;
  password: string;
}

export const fetchLogin = async ({ email, password }: { email: string; password: string }) => {
  return await modoosAxios.post<{ accessToken: string }>('/api/auth/login', { email, password });
};
