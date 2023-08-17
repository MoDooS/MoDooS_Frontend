import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import React from 'react';

type Props = {};

export default function Feedback({}: Props) {
  return (
    <Layout>
      <MypageLayout>
        <div>하이</div>
      </MypageLayout>
    </Layout>
  );
}
