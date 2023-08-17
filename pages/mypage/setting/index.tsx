import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import SettingInfo from '@/components/settingInfo/settingInfo';
import SettingButtons from '@/components/settingInfo/SettingBtn';

const Setting = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // 저장 로직 구현
    setIsEditing(false);
  };

  return (
    <Layout>
      <MypageLayout>
        <main className='flex justify-center h-100vh'>
          <div className='max-w-[1200px] w-full flex gap-20'>
            <div className='flex flex-col gap-20 w-full'>
              <section className='p-15 bg-white h-full rounded-12 border-1 border-gray_60 overflow-hidden'>
                <div className='text-18 text-black font-medium mb-14'>기본 정보</div>
                <SettingInfo isEditing={isEditing} />
                <SettingButtons
                  isEditing={isEditing}
                  onEditClick={handleEditClick}
                  onCancelClick={handleCancelClick}
                  onSaveClick={handleSaveClick}
                />
              </section>
            </div>
          </div>
        </main>
      </MypageLayout>
    </Layout>
  );
};

export default Setting;
