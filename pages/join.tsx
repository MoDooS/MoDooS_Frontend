import React, { useState } from 'react';
import Image from 'next/image';
import BasicLayout from '@/components/layouts/basicLayout';
import ShortField from '../components/shortField';
import MainBtn from '@/components/mainBtn';
import LongField from '@/components/longField';

interface JoinFormType {
  nickname: string;
  email: string;
  password: string;
}

interface JoinFormErrType {
  nicknameErr: string;
  codeErr: string;
}

const initialForm: JoinFormType = {
  nickname: '',
  email: '',
  password: '',
};

const initialError: JoinFormErrType = {
  nicknameErr: '',
  codeErr: '',
};

const JoinForm: React.FC = () => {
  const [form, setForm] = useState<JoinFormType>(initialForm);

  const handleNicknameChange = (value: string) => {
    setForm((prev) => ({ ...prev, nickname: value }));
  };

  const handlePasswordChange = (value: string) => {
    setForm((prev) => ({ ...prev, password: value }));
  };
  return (
    <BasicLayout>
      <div className='flex-col mb-60'>
        <Image src={'/imgs/logo_1.png'} alt='logo' width={160} height={0} className='mx-auto mt-45' />
        <div className='flex justify-center'>
          <form className='flex-col mt-30'>
            {' '}
            <ShortField
              field={{
                label: '닉네임',
                placeholder: '모스부호',
                onChange: handleNicknameChange,

                // errMsg: emailErr,
              }}
              btnText='중복확인'
            />
            <ShortField
              field={{
                placeholder: 'matthew10164@gmail.com',
                onChange: handlePasswordChange,

                // errMsg: emailErr,
              }}
              btnText='인증'
            />{' '}
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '숫자 4자리 입력',
                onChange: handleNicknameChange,
                // errMsg: emailErr,
              }}
            />
            <LongField
              field={{
                label: '비밀번호',
                placeholder: '****',
                onChange: handleNicknameChange,
              }}
            />
            <LongField
              field={{
                label: '비밀번호 재확인',
                placeholder: '****',
                onChange: handleNicknameChange,
              }}
            />
            <br />
            <MainBtn text='회원가입하기' />
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

export default JoinForm;
