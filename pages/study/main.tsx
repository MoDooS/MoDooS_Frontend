import Attandance from '@/components/feedback/attendance';
import CheckList from '@/components/feedback/checklist';
import Feedback from '@/components/feedback/feedback';
import Title from '@/components/feedback/title';
import Layout from '@/components/layouts/layout';
import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();
  return (
    <Layout>
      <main className='flex flex-col items-center pt-60 px-200'>
        <div className='bg-white w-full max-w-1058 h-full rounded-32 px-30 py-40'>
          <div className='flex justify-between'>
            <h1 className=' text-black font-semibold text-25 mb-20'>출석현황</h1>
            <button
              className='rounded-14 bg-purple_sub text-white w-80 h-43 text-14'
              onClick={() => {
                router.push('/study/evaluation');
              }}
            >
              평가하기
            </button>
          </div>

          <div className='bg-gray_50 w-full h-1'></div>
          <Attandance />
          <Title text='체크리스트 통과여부' />

          <CheckList />
          <Title text='2주차에 내가 받은 피드백' />
          <Feedback />
        </div>
      </main>
    </Layout>
  );
};

export default Main;
