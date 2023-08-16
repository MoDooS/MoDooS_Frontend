import Layout from '@/components/layouts/layout';

const rankingInfo = () => {
  const scores = [
    '1000점 이상',
    '800점 ~ 999점',
    '600점 ~ 799점',
    '400점 ~ 599점',
    '200점 ~ 399점(Beginner default)',
    '0점 ~ 199점',
    '0점',
  ];
  const ranks = ['S+', 'S', 'A+', 'A', 'B', 'C', 'F'];

  return (
    <Layout>
      <main className=' pt-20 flex justify-center'>
        <div className='max-w-[1200px] w-full flex gap-20'>
          <section className='flex flex-col items-center shrink-0 w-200 h-full bg-white py-60 px-20 rounded-12 border-1 border-gray_60 overflow-hidden'>
            <div className='w-80 h-80 bg-gray_60 mb-13 rounded-full'></div>
            <span className='block text-14 font-normal text-black mb-80'>삼식이</span>
            <div className='flex justify-start w-full text-14 font-normal text-black mb-10'>랭킹</div>
            <button className='w-full bg-primary text-white py-8 text-12 rounded-5'>전체 랭킹</button>
          </section>
          <div className='flex flex-col gap-20 w-full'>
            <section className='w-full bg-white p-15 shrink-0 rounded-12 border-1 border-gray_60 overflow-hidden'>
              <h4 className=' text-18 text-black font-medium mb-14'>삼식이 의 랭킹 정보입니다.</h4>
              <div className='flex gap-16 w-full'>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>현재 랭킹</h5>
                  <div className='flex justify-center w-full text-32'>A+</div>
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>명지대에서의 랭킹</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>8등</div>
                </article>
                <article className='p-12 rounded-10 bg-bg1 w-full h-150 flex justify-center items-center relative'>
                  <h5 className=' absolute top-12 left-12 text-16 text-black font-normal'>순위</h5>
                  <div className='flex justify-center w-full text-26 font-bold text-primary'>상위 10%</div>
                </article>
              </div>
            </section>
            <section className='p-15 bg-white h-full rounded-12 border-1 border-gray_60 overflow-hidden'>
              <h4 className=' text-18 text-black font-medium mb-14'>MOST(MOSTrust) 랭킹 체계</h4>
              <div className='grid grid-cols-3 gap-16 w-full'>
                <article className='col-span-2 rounded-12 border-1 border-gray_60 overflow-hidden'>
                  {/* 상단 타이틀 */}
                  <div className='pl-24 py-12 pb-49 text-14 bg-gray_40 flex flex-col'>
                    <div>등급표</div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-yellow_50 bg-yellow_50/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-yellow_50`}>{ranks[0]}</span>
                      </div>
                      <span className={`text-yellow_50`}>{scores[0]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-orange_50 bg-orange_50/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-orange_50`}>{ranks[1]}</span>
                      </div>
                      <span className={`text-orange_50`}>{scores[1]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-purple_thr bg-purple_thr/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-purple_thr`}>{ranks[2]}</span>
                      </div>
                      <span className={`text-purple_thr`}>{scores[2]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-sky_blue bg-sky_blue/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-sky_blue`}>{ranks[3]}</span>
                      </div>
                      <span className={`text-sky_blue`}>{scores[3]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-green_70 bg-green_70/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-green_70`}>{ranks[4]}</span>
                      </div>
                      <span className={`text-green_70`}>{scores[4]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-standard_blue bg-standard_blue/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-standard_blue`}>{ranks[5]}</span>
                      </div>
                      <span className={`text-standard_blue`}>{scores[5]}</span>
                    </div>
                    <div className='flex items-center mt-22'>
                      <div
                        className={`justify-center flex items-center gap-27 w-52 h-52 rounded-26 border border-stone-500 bg-stone-500/[0.1] mr-47`}
                      >
                        <span className={`text-23 font-bold text-stone-500`}>{ranks[6]}</span>
                      </div>
                      <span className={`text-stone-500`}>{scores[6]}</span>
                    </div>
                  </div>
                </article>
                <article className='col-span-1 rounded-12 border-1 border-gray_60 overflow-hidden'>
                  <div className='px-16 py-12 text-14 bg-gray_40 flex flex-col'>
                    <div className='mt-4'>신용 점수 획득 기준</div>
                    <div className='mt-16'>[이럴 때 등급이 올라가요]</div>
                    <div className='flex items-center text-standard_blue mt-16 mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 출석체크 +5점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5 '></div> 피드백 + 5점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 피드백 + 5점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 매 회차 성실도 피드백 평균 점수에
                      따라
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 5점 이상 +20점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 3점 이상 4점 미만
                      + 0점
                    </div>

                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 스터디 완주 시 +100점
                    </div>

                    <div className='mt-12'>[이럴 때 등급이 내려가요]</div>
                    <div className='flex items-center text-standard_blue mt-16 mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 1 out -30점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 스터디 방출 -200점 (출석,
                      상세규칙)
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 피드백 미완료 -20점
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 매 회차 성실도 피드백 평균 점수에
                      따라
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 2점 미만 -20점
                    </div>
                    <div className='mt-12'>Default 규칙</div>
                    <div className='flex items-center text-standard_blue mt-16 mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 결석 1번이면 1 out
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 지각 2번 = 결석 1번 = 1 out
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div> 상세 규칙 불이행 시 1 out
                    </div>
                    <div className='flex items-center text-standard_blue mb-4'>
                      <div className='bg-standard_blue w-5 h-5 rounded-3 mr-5'></div>⚠️ 3 out 시 스터디 자동 퇴출
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default rankingInfo;
