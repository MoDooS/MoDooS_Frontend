import Layout from '@/components/layouts/layout';
import { RecruitFormType } from '@/types/recruitForm';
import React from 'react';
import RecruitForm from '@/components/recruitForm';
import { useRouter } from 'next/router';
import { useRecruitDetailQuery } from '@/query/recruit/useRecruitDetailQuery';

const Edit = () => {
  const router = useRouter();
  const recruitId = router.query.id as string;
  const { recruit, isLoading: isRecruitLoading, isError: isRecruitError } = useRecruitDetailQuery(recruitId);

  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        {recruit && (
          <RecruitForm
            defaultForm={{
              ...recruit,
              contact: recruit.contact ?? '',
              link: recruit.link ?? '',
              checkList: recruit.checkList.map((item) => item.content),
            }}
            mode='edit'
          />
        )}
      </main>
    </Layout>
  );
};

export default Edit;
