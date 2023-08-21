import Layout from '@/components/layouts/layout';
import MypageLayout from '@/components/layouts/mypageLayout';

const rankingInfo = () => {
  const scores = [
    '1000점 이상',
    '800점 ~ 999점',
    '600점 ~ 799점',
    '400점 ~ 599점',
    '200점 ~ 399점(Beginner default)',
    '50점 ~ 199점',
    '0점 ~ 49점',
  ];
  const ranks = ['S+', 'S', 'A+', 'A', 'B', 'C', 'F'];

  return (
    <Layout>
      <MypageLayout>
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
              <div className='mt-5 text-16'>신용 점수 획득 기준</div>
              <div className='mt-30'>[이럴 때 등급이 올라가요]</div>
              <div className='flex items-center text-gray_70 mt-5 mb-5'>출석체크 +5점</div>

              <div className='flex items-center text-gray_70 mb-5'>피드백 + 5점</div>
              <div className='flex items-center text-gray_70 mb-5'>매 회차 성실도 피드백 평균 점수에 따라</div>
              <div className='flex items-center text-gray_70 mb-5'>
                <div className='bg-gray_70 w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 5점 이상 +20점
              </div>
              <div className='flex items-center text-gray_70 mb-5'>
                <div className='bg-gray_70 w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 3점 이상 4점 미만 + 0점
              </div>

              <div className='flex items-center text-gray_70 mb-5'>스터디 완주 시 +200점</div>

              <div className='mt-30'>[이럴 때 등급이 내려가요]</div>
              <div className='flex items-center text-gray_70 mt-5 mb-5'>1 out -30점</div>
              <div className='flex items-center text-gray_70 mb-5'>스터디 방출 -200점 (출석, 상세규칙)</div>
              <div className='flex items-center text-gray_70 mb-5'>피드백 미완료 -20점</div>
              <div className='flex items-center text-gray_70 mb-5'>매 회차 성실도 피드백 평균 점수에 따라</div>
              <div className='flex items-center text-gray_70 mb-5'>
                <div className='bg-gray_70 w-5 h-5 rounded-1 ml-20 mr-5'></div> 평균 점수 2점 미만 -20점
              </div>
            </div>
          </article>
        </div>
      </MypageLayout>
    </Layout>
  );
};

export default rankingInfo;
