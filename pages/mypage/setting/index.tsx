import React, { useState } from 'react';
import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import SettingInfo from '@/components/settingInfo/settingInfo';
import SettingButtons from '@/components/settingInfo/SettingBtn';
import { MyInfoRequest } from '@/types/myInfoRequest';
import { useImmer } from 'use-immer';
import { useUserQuery, USER_QUERY_KEY } from '@/hooks/queries/user/useUserQuery';
import { Draft } from 'immer';
import { newUserInfo } from '@/apis/newUserInfo';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { UserResponse } from '@/apis/getUser';

export type SettingInfoProps = {
  isEditing: boolean;
  editedUser: MyInfoRequest;
  updateEditedUser: (recipe: (draft: Draft<MyInfoRequest>) => void) => void;
  user: UserResponse | undefined;
};

const Setting = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { user, isLoading: isUserLoading, isError: isUserError } = useUserQuery();
  const editUserInfo = useMutation(newUserInfo);
  const [editedUser, updateEditedUser] = useImmer<MyInfoRequest>({
    nickname: user?.nickname || '',
    campus: user?.campus || '인문',
    department: user?.department || '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    await editUserInfo.mutateAsync(editedUser, {
      onSuccess: (response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries(USER_QUERY_KEY);
          console.log('User information updated successfully!');
        }
      },
    });
  };

  return (
    <Layout onlyAccess='user'>
      <MypageLayout>
        <main className='flex justify-center h-100vh'>
          <div className='max-w-[1200px] w-full flex gap-20'>
            <div className='flex flex-col gap-20 w-full'>
              <section className='p-15 bg-white h-full rounded-12 border-1 border-gray_60 overflow-hidden'>
                <div className='text-18 text-black font-medium mb-14'>기본 정보</div>
                <SettingInfo
                  isEditing={isEditing}
                  editedUser={editedUser}
                  updateEditedUser={updateEditedUser}
                  user={user}
                />
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
