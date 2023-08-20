import { AxiosError, AxiosResponse } from 'axios';
import { reissueAccessToken } from './reissueAccessToken';
import { authToken } from '@/class/authToken';

// api 요청에서 401에러가 났을 때 토큰 재발급 후 재실행 로직을 수행하는 함수
export async function withVerify<T>(
  apiFn: () => Promise<AxiosResponse<T, AxiosError>>,
): Promise<AxiosResponse<T, AxiosError>> {
  try {
    // 1. 원래 api 요청
    return await apiFn();
  } catch (error) {
    // 2. 에러 시 401에러가 아니라면 그대로 에러 반환
    const { response } = error as AxiosError;
    if (response?.status !== 401) {
      throw error as AxiosError;
    }

    // 3. 401 에러라면 accessToken 재발급 요청
    try {
      const response = await reissueAccessToken();
      authToken.setToken(response.data.accessToken);
      return await apiFn();
    } catch {
      // 4. 재발급 실패 시 401 에러 반환
      throw error as AxiosError;
    }
  }
}
