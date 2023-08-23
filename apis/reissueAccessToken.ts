import modoosAxios from './modoosAxios';

export async function reissueAccessToken() {
  return await modoosAxios.post<{ accessToken: string }>('/api/auth/reissue');
}
