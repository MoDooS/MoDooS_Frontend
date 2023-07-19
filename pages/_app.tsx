import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  // next.js는 페이지 전환마다 _app.tsx가 렌더링되므로 queryClient가 재선언되지 않게 useState로 관리
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
