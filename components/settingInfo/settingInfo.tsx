import React from 'react';

type SettingInfoProps = {
  isEditing: boolean;
};

const SettingInfo: React.FC<SettingInfoProps> = ({ isEditing }) => {
  return (
    <div className='mb-50 flex flex-col gap-10'>
      {isEditing ? (
        <div className='flex flex-col gap-13'>
          <div className='text-15'>
            {' '}
            닉네임:
            <input type='text' defaultValue={'하이'} className='ml-8 p-2 pl-4 border border-gray_60 rounded-12' />
          </div>
          <div className='text-15'>
            {' '}
            이메일:
            <input
              type='text'
              defaultValue='example@mju.ac.kr'
              className='ml-8 p-2 pl-4 border border-gray_60 rounded-12'
            />
          </div>
          <div className='text-15'>
            {' '}
            캠퍼스:
            <input type='text' defaultValue='인문' className='ml-8 p-2 pl-4 border border-gray_60 rounded-12' />
          </div>
          <div className='text-15'>
            {' '}
            학과:&nbsp;&nbsp;&nbsp;
            <input
              type='text'
              defaultValue='융합소프트웨어학부'
              className='ml-8 p-2 pl-4 border border-gray_60 rounded-12'
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-13'>
          <div className='text-15'>
            닉네임 <span>: 하이</span>
          </div>
          <div className='text-15'>
            이메일 <span>: example@mju.ac.kr</span>
          </div>
          <div className='text-15'>
            캠퍼스 <span>: 인문</span>
          </div>
          <div className='text-15'>
            학과 <span>: 융합소프트웨어학부</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingInfo;
