import BasicLayout from '@/components/layouts/basicLayout';
import LongField from '@/components/auth/longField';
import MainBtn from '@/components/auth/mainBtn';
import ShortField from '@/components/auth/shortField';
import Image from 'next/image';
import { validateEmail, validatePassword, validateNickname } from '@/utils/validation';
import { LoginFormType } from '@/pages/login';
import { useState } from 'react';

const initialRepasswordForm: LoginFormType = {
  email: '',
  password: '',
};

interface ErrType {
  emailErr: string;
  codeErr: string;
  passwordErr: string;
  repasswordErr: string;
}

const InitialErr: ErrType = {
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repasswordErr: '',
};

const RepasswordForm: React.FC = () => {
  const [activation, setActivation] = useState(false);

  const [form, setForm] = useState<LoginFormType>(initialRepasswordForm);
  const [err, setErr] = useState<ErrType>(InitialErr);

  const [code, setCode] = useState(0);
  const [authMsg, setAuthMsg] = useState('');

  const [emailValidity, setEmailValidity] = useState(false);

  const handleNicknameChange = (value: string) => {
    // setForm((prev) => ({ ...prev, nickname: value }));
  };

  const handleEmailChange = (value: string) => {
    const emailErr = validateEmail(value);
    setForm((prev) => ({ ...prev, email: value }));
    setErr((prev) => ({ ...prev, emailErr: emailErr }));
    setEmailValidity(!emailErr);
  };

  const handlePasswordChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
    setErr((prev) => ({ ...prev, passwordErr: validatePassword(value) }));
  };

  const handleRePasswordChange = (value: string) => {
    setErr((prev) => ({ ...prev, repasswordErr: validatePassword(value) }));
    if (value !== form.password) {
      setErr((prev) => ({ ...prev, repasswordErr: '비밀번호가 일치하지 않습니다.' }));
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(parseInt(value));
    // 서버에 코드를 보내기
    // 맞으면
    // setAuthMsg('인증되었습니다!');
    // 틀리면 err메세지
    setErr((prev) => ({ ...prev, codeErr: '코드가 맞지않습니다.' }));

    // 회원가입 버튼 누른 뒤 코드 안맞을시에 대한 err코드 작성
  };

  return (
    <BasicLayout>
      <div className='flex-col mb-60'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            {' '}
            <LongField
              field={{
                label: '이메일',
                placeholder: 'matthew10164@mju.ac.kr',
                onChange: handleEmailChange,
                errMsg: err.emailErr,
              }}
            />
            <MainBtn text='매일 보내기' activation={emailValidity} />
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '모스부호',
                onChange: handleCodeChange,
                errMsg: err.codeErr,
                authMsg: authMsg,
              }}
            />
            <LongField
              field={{
                label: '새 비밀번호',
                placeholder: '****',
                onChange: handlePasswordChange,
                errMsg: err.passwordErr,
              }}
            />
            <LongField
              field={{
                label: '비밀번호 재확인',
                placeholder: '****',
                onChange: handleRePasswordChange,
                errMsg: err.repasswordErr,
              }}
            />
            <MainBtn text='비밀번호 변경하기' />
            <br />
            <div className='flex-col justify-center mt-37 space-y-3'>
              <div className='text-15 text-gray_70 font-normal text-center'>
                회원이 아니신가요?{' '}
                <a href={'/join'} className='text-purple_sub underline decoration-solid	'>
                  회원가입
                </a>
              </div>
              <div className='text-15 text-gray_70 font-normal text-center'>
                비밀번호를 모르겠나요?{' '}
                <a href={'/resetPassword'} className='text-purple_sub underline decoration-solid	'>
                  비밀번호찾기
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default RepasswordForm;
