import { useRouter } from 'next/router';
import React from 'react';
type SettingBtnProps = {
  isEditing: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
};

const SettingBtn: React.FC<SettingBtnProps> = ({ isEditing, onEditClick, onCancelClick, onSaveClick }) => {
  const router = useRouter();

  return (
    <div className='flex justify-end gap-20 p-20'>
      {!isEditing ? (
        <div className='flex justify-end gap-20 p-20'>
          <button className='text-gray_70 text-14 bg-gray rounded-14 py-10 px-14'>회원 탈퇴</button>
          <button
            className='text-white text-14 bg-purple_sub rounded-14 py-10 px-14'
            onClick={() => {
              router.push('/resetPassword');
            }}
          >
            비밀번호 재설정
          </button>
          <button className='text-white text-14 bg-purple_sub rounded-14 py-10 px-14' onClick={onEditClick}>
            수정하기
          </button>
        </div>
      ) : (
        <>
          <button className='text-gray_70 text-14 bg-gray rounded-14 py-10 px-14' onClick={onCancelClick}>
            취소
          </button>
          <button className='text-white text-14 bg-purple_sub rounded-14 py-10 px-14' onClick={onSaveClick}>
            저장
          </button>
        </>
      )}
    </div>
  );
};

export default SettingBtn;
