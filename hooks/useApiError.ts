// 에러 발생 시 실행할 가능성이 있는 핸들러 종류
// 순서대로 실행 우선 순위
//
// 1. 컴포넌트에서 http status key로 재정의한 handler
// 2. hook에서 http status key로 정의한 handler
// 3. 어디에서도 정의되지 않은 에러를 처리하는 handler

import { AxiosError } from 'axios';

const defaultHandlers: { common: () => void; default: () => void; [key: number]: () => void } = {
  common: () => {}, // 공통 처리 로직
  default: () => {}, // 어디에서도 정의되지 않은 에러를 처리
  401: () => {
    console.log('인증 에러');
  }, // 401 인증 에러
};

export default function useApiError(handlers?: { [key: number]: () => void }) {
  const handlerError = (error: AxiosError) => {
    const status = error.response?.status;
    if (typeof status !== 'number') {
      defaultHandlers.default();
      return;
    }
    switch (true) {
      // 우선 순위 1. 컴포넌트에서 http status key로 재정의한 handler
      case handlers && status in handlers:
        handlers![status]();
        break;

      // 우선 순위 2. hook에서 http status key로 정의한 handler
      case status in defaultHandlers:
        defaultHandlers[status]();
        break;

      // 우선 순위 3. 어디에서도 정의되지 않은 에러를 처리하는 handler
      default:
        defaultHandlers.default();
    }

    // 공통 처리 로직 수행
    defaultHandlers.common();
  };

  return { handlerError };
}
