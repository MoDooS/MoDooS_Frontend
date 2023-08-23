import { fetchJoin } from '@/apis/auth/join';
import { LoginFormType, fetchLogin } from '@/apis/auth/login';
import { fetchResetPassword } from '@/apis/auth/resetPassword';
import { authToken } from '@/class/authToken';
import { JoinFormType } from '@/types/joinType';
import { useRouter } from 'next/router';
import { HTMLAttributes, memo, useCallback } from 'react';
import { useMutation } from 'react-query';

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
  const loginMutation = useMutation(fetchLogin);

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
        await fetchJoin(form as JoinFormType);
        router.push(toPath);
        return;
      }

      if (btnType === 'login') {
        if (!form) return;
        loginMutation.mutate(form, {
          onSuccess: (res) => {
            authToken.setToken(res.data.accessToken);
            console.log(authToken.getToken());
            router.push(toPath);
          },
          onError: () => onLoginFailure && onLoginFailure('이메일/비밀번호가 일치하지 않습니다.'),
        });
        return;
      }

      if (btnType === 'resetPassword') {
        if (!form) return;
        await fetchResetPassword(form as JoinFormType);
        router.push(toPath);
        return;
      }

      if (btnType === 'email') {
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
