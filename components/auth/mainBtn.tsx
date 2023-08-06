import { JoinFormType, fetchJoin } from '@/apis/auth/join';
import { LoginFormType, fetchLogin } from '@/apis/auth/login';
import { fetchResetPassword } from '@/apis/auth/resetPassword';
import { useRouter } from 'next/router';
import { HTMLAttributes, memo, useCallback } from 'react';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  activation?: boolean;
  btnType?: string;
  toPath?: string;
  form?: JoinFormType | LoginFormType;
  onLoginFailure?: (error: string) => void;
  onClick?: () => void; // 비동기 함수 허용
}

const MainBtn: React.FC<Props> = ({ text, activation, toPath, form, btnType, onClick, onLoginFailure }) => {
  const router = useRouter();

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) onClick();
    },
    [onClick],
  );

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
        if (res) {
          // console.log(res);
          router.push(toPath);
        } else {
          // 로그인 실패
          if (onLoginFailure) {
            onLoginFailure('이메일/비밀번호가 일치하지 않습니다.');
          }
        }
      } else if (btnType === 'resetPassword') {
        if (!form) return;
        const res = await fetchResetPassword(form as JoinFormType);
        router.push(toPath);
      } else if (btnType === 'email') {
        // onClick 함수가 유효한 경우에만 호출
        if (onClick) {
          onClick();
        }
      }
    } catch (error) {
      console.error('요청에 실패했습니다:', error);
    }
  };

  return (
    <button
      disabled={!activation}
      onClick={activation ? handleClick : handleButtonClick}
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
