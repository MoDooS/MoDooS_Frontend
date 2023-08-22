import { SettingInfoProps } from '@/pages/mypage/setting';
import { MyInfoRequest } from '@/types/myInfoRequest';
import React from 'react';
import Category from '../auth/category';
import { StudyCampus } from '@/types/studyInfo';

const SettingInfo: React.FC<SettingInfoProps> = ({ isEditing, editedUser, updateEditedUser, user }) => {
  // 각 입력 필드에서 값이 변경될 때 호출되는 함수
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, value: string, field: keyof MyInfoRequest) => {
    updateEditedUser((draft) => {
      draft[field] = event.target.value;
      return draft;
    });
  };

  const handleCategoryChange = (campus: StudyCampus, major: string) => {
    updateEditedUser((draft) => {
      draft.campus = campus;
      draft.department = major;
    });
  };
  return (
    <div className='mb-50 flex flex-col gap-10'>
      {isEditing ? (
        <div className='flex flex-col gap-13'>
          <div className='text-15'>
            {' '}
            닉네임:
            <input
              type='text'
              defaultValue={user?.nickname}
              onChange={(event) => handleFieldChange(event, event.target.value, 'nickname')}
              className='ml-8 py-8 px-10 rounded-17 border border-gray_70'
            />
          </div>
          <div className='text-15'>
            {' '}
            이메일:
            <span>&nbsp;&nbsp; {user?.email}</span>
          </div>
          <div className='text-15'>
            {' '}
            캠퍼스:&nbsp;&nbsp;
            <Category
              onChange={handleCategoryChange}
              defaultCampus={user?.campus}
              defaultDepartment={user?.department}
            />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-13'>
          <div className='text-15'>
            닉네임 <span>: {user?.nickname}</span>
          </div>
          <div className='text-15'>
            이메일 <span>: {user?.email}</span>
          </div>
          <div className='text-15'>
            캠퍼스 <span>: {user?.campus}</span>
          </div>
          <div className='text-15'>
            학과 <span>: {user?.department}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingInfo;
