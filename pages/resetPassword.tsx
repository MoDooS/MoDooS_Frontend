import BasicLayout from '@/components/layouts/basicLayout';
import LongField from '@/components/longField';
import MainBtn from '@/components/mainBtn';
import ShortField from '@/components/shortField';
import Image from 'next/image';

const RepasswordForm: React.FC = () => {
  const handleNicknameChange = (value: string) => {
    // setForm((prev) => ({ ...prev, nickname: value }));
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
                placeholder: 'matthew10164@gmail.com',
                onChange: handleNicknameChange,
              }}
            />
            <MainBtn text='매일 보내기' />
            <ShortField
              field={{
                label: '코드입력',
                placeholder: '모스부호',
                onChange: handleNicknameChange,

                // errMsg: emailErr,
              }}
            />
            <LongField
              field={{
                label: '새 비밀번호',
                placeholder: '****',
                onChange: handleNicknameChange,
              }}
            />
            <LongField
              field={{
                label: '비밀번호 재확인',
                placeholder: 'matthew10164@gmail.com',
                onChange: handleNicknameChange,
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
