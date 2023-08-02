// 파일: MainBtn.tsx
import { JoinFormType, fetchJoin } from '@/apis/auth/join';
import { LoginFormType, fetchLogin } from '@/apis/auth/login';
import { useRouter } from 'next/router';
import React, { HTMLAttributes, memo, useCallback } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
  activation?: boolean;
  btnType: string;
  toPath?: string;
  form?: JoinFormType | LoginFormType;
}

const MainBtn: React.FC<Props> = ({ text, activation, toPath, form, btnType }) => {
  const router = useRouter();

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (!activation || !toPath) {
        return;
      }
      // 비동기 처리는 useEffect 안에서 호출하거나, 즉시 실행 함수로 감싸서 사용
      try {
        if (btnType === 'join') {
          if (!form) return;
          const res = await fetchJoin(form as JoinFormType);
          router.push(toPath);
        } else if (btnType === 'login') {
          if (!form) return;
          const res = await fetchLogin(form as LoginFormType);
          router.push('#');
        }
      } catch (error) {
        console.error('요청에 실패했습니다:', error);
      }
    },
    [activation, toPath, form, btnType, router],
  );

  return (
    <button
      disabled={!activation}
      onClick={handleClick}
      type='submit'
      className={`${
        activation ? 'bg-purple_sub text-white' : 'bg-gray text-gray_70 '
      } max-w-360 w-full text-17 py-13 mt-20 rounded-17`}
    >
      {text}
    </button>
  );
};

export default memo(MainBtn);
