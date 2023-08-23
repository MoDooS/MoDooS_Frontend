import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';
import useAlarmsQuery from '@/hooks/queries/useAlarmsQuery';
import { Alarm } from '@/types/alarm';
import { cls } from '@/utils/cls';
import { useRouter } from 'next/router';

export default function Notice() {
  const router = useRouter();
  const { alarms } = useAlarmsQuery();
  function handleClickAlarm(alarm: Alarm) {
    if (alarm.alarmType === '스터디 승인 요청 알림') {
      router.push('/mypage/study-apply');
    }
    if (alarm.alarmType === '내 스터디 댓글 알림') {
      router.push(`/recruit/${alarm.studyId}`);
    }
  }
  return (
    <Layout>
      <MypageLayout>
        <h4 className='text-18 text-black font-medium mb-14'>알림 목록</h4>
        <article className='h-full rounded-12 border-1 border-gray_60 overflow-y-scroll'>
          {/* 상단 타이틀 */}
          <div className='pl-24 py-12 flex text-14'>
            <div className='w-50 shrink-0'>번호</div>
            <div className='w-full flex'>
              <div className='px-16 w-[50%]'>제목</div>
              <div className='px-16 w-[50%]'>종류</div>
            </div>
          </div>
          {alarms && !alarms.length && (
            <div className='relative w-full h-full'>
              <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full font-normal text-20 text-gray_70'>
                알림함이 비었습니다.
              </div>
            </div>
          )}
          {alarms?.map((alarm, i) => (
            <div
              onClick={() => handleClickAlarm(alarm)}
              key={i}
              className={cls('pl-24 py-16 flex text-14 cursor-pointer', i % 2 == 0 ? 'bg-[#F6F8FB]' : 'bg-white')}
            >
              <div className='w-50 shrink-0 font-medium'>{i + 1}</div>
              <div className='w-full flex'>
                <div className='px-16 w-[50%]'>{alarm.content}</div>
                <div className='px-16 w-[50%] font-medium'>{alarm.alarmType}</div>
              </div>
            </div>
          ))}
        </article>
      </MypageLayout>
    </Layout>
  );
}
