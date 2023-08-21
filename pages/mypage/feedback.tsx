import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';

export default function Feedback() {
  return (
    <Layout>
      <MypageLayout>
        <h4 className='text-18 text-black font-medium mb-50'>나에 대한 피드백</h4>
        <h6 className='text-14 text-black font-normal mb-10'>이런점은 좋았어요!</h6>
      </MypageLayout>
    </Layout>
  );
}
