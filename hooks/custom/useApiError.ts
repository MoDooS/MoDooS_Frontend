// 에러 발생 시 실행할 가능성이 있는 핸들러 종류
// 순서대로 실행 우선 순위
//
// 1. 컴포넌트에서 http status key로 재정의한 handler
// 2. hook에서 http status key로 정의한 handler
// 3. 어디에서도 정의되지 않은 에러를 처리하는 handler

// 사용법 (react-query)

// const { handleApiError } = useApiError

// 1. 기본 handler만 사용할 때
// onError: handleApiError()

// 2. 추가로 handler를 정의할 때
// onError: handleApiError({
//    401:()=>{...}
// })

import useAlert from '@/recoil/alert/useAlert';
import { AxiosError } from 'axios';

export default function useApiError() {
  const { showAlert } = useAlert();
  const defaultHandlers: { common: () => void; default: () => void; [key: number]: () => void } = {
    common: () => {}, // 공통 처리 로직

    // 어디에서도 정의되지 않은 에러를 처리
    default: () => {
      showAlert({
        alertViewTitle: '알 수 없는 문제가 발생했습니다.\n잠시 후에 다시 시도해주세요.',
        alertActions: [{ title: '확인', style: 'primary', handler: null }],
      });
    },
    401: () =>
      showAlert({
        alertViewTitle: '토큰이 만료되었습니다.\n다시 로그인해주세요.',
        alertActions: [{ title: '확인', style: 'primary', handler: null }],
      }),
    500: () =>
      showAlert({
        alertViewTitle: '서버에 문제가 발생했습니다.\n잠시 후에 다시 시도해주세요.',
        alertActions: [{ title: '확인', style: 'primary', handler: null }],
      }),
  };
  const handleApiError = (handlers?: { [key: number]: () => void }) => (err: unknown) => {
    const error = err as AxiosError; // api 요청의 모든 에러를 Axios 에러로 통일
    const status = error.response?.status;

    // status 타입 가드
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
  return { handleApiError };
}
