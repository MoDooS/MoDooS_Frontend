import DropDownSelect, { DropDownOption } from '@/components/select/dropDownSelect';
import Layout from '@/components/layouts/layout';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cls } from '@/utils/cls';
import StudyCard from '@/components/pages/index/studyCard';
import CreateStudyBtn from '@/components/pages/index/createStudyBtn';
import { useRouter } from 'next/router';
import Banner from '@/components/layouts/banner';
import { StudySortingMethod, studySortingMethodMapping } from '@/types/studyParams';
import { useRecruitsQuery } from '@/query/recruit/useRecruitsQuery';
import { StudyCategory, studyCategories } from '@/types/studyInfo';

const studySortingOptions: DropDownOption[] = [
  { value: 'recent', content: '최신순' },
  { value: 'recruit_popular', content: '인기순' },
  { value: 'recruit_deadline', content: '마감임박순' },
];

export default function Home() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<StudyCategory[]>(['ALL']);
  const [studySortingMethod, setStudySortingMethod] = useState<StudySortingMethod>('recent');

  const { recruitList, isLoading, isError, getNextRecruits, getRecruitsIsSuccess, getNextRecruitsIsPossible } =
    useRecruitsQuery({
      categories: selectedCategories,
      sort: studySortingMethod,
      size: 12,
    });

  console.log(recruitList);

  const [scrollRef, inView] = useInView();

  useEffect(() => {
    console.log('getNextRecruits');
    if (inView && getNextRecruitsIsPossible) {
      getNextRecruits();
    }
  }, [inView, getNextRecruitsIsPossible, getNextRecruits]);

  const handleSelectCategory = (category: StudyCategory) => {
    if (category === 'ALL') {
      setSelectedCategories(['ALL']);
      return;
    }
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length === 1) {
        setSelectedCategories(['ALL']);
        return;
      }
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
      return;
    }
    console.log('10');
    if (selectedCategories.length + 2 === studyCategories.length) {
      setSelectedCategories(['ALL']);
      return;
    }
    setSelectedCategories((prev) => [...prev, category].filter((c) => c !== 'ALL'));
  };
  return (
    <Layout hasFooter>
      <Banner />
      <div className='pt-50 pb-200 px-140 min-h-1000'>
        <div className='flex items-center gap-30 mb-14'>
          {/* 필터링 박스들 */}
          <section className='flex items-center gap-30'>
            {studyCategories.map((categorie) => (
              <button
                key={categorie}
                onClick={() => handleSelectCategory(categorie)}
                className={cls(
                  'py-18 px-16 text-16 font-medium border-1 border-solid rounded-100',
                  selectedCategories.includes(categorie)
                    ? 'text-primary bg-[#F8E8FF] border-primary'
                    : 'text-black bg-white border-[#D0D0D0]',
                )}
              >
                {categorie}
              </button>
            ))}
          </section>
          {/* 검색창 여기다 구현 */}
        </div>
        <div className='flex justify-end mb-20'>
          <DropDownSelect
            className='w-150 text-16'
            value={studySortingMethodMapping[studySortingMethod]}
            options={studySortingOptions}
            selectHandler={(value: StudySortingMethod) => setStudySortingMethod(value)}
          />
        </div>
        <main className='flex flex-wrap gap-24'>
          {recruitList?.map((studyInfo) => (
            <StudyCard key={studyInfo.id} studyInfo={studyInfo} />
          ))}
          <div ref={scrollRef}></div>
        </main>
        <CreateStudyBtn onClick={() => router.push('/recruit/new')} className='fixed z-[9999] bottom-50 right-140' />
      </div>
    </Layout>
  );
}
