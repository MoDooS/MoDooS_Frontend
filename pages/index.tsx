import Image from 'next/image';
import { Inter } from 'next/font/google';
import DatePicker, { CalendarRange, SelectedDateRange } from '@/components/datePicker/datePicker';
import dayjs from 'dayjs';
import useDatePicker from '@/hooks/useDatePicker';
import DropDownSelect, { DropDownOption } from '@/components/select/dropDownSelect';
import useAlert from '@/recoil/alert/useAlert';
import Layout from '@/components/layouts/layout';
import { useState } from 'react';
import { cls } from '@/utils/cls';
import StudyCard from '@/components/pages/index/studyCard';
import CreateStudyBtn from '@/components/pages/index/createStudyBtn';

export type StudyInfo = {
  id: number;
  category: string;
  status: '모집 중' | '마감';
  deadline: string;
  title: string;
  leader: {
    profileImg: string;
    nickname: string;
  };
};

const DUMMY_STUDYS: StudyInfo[] = [
  {
    id: 1,
    category: '프로그래밍',
    status: '모집 중',
    deadline: '2023.07.31',
    title: '알고리즘 스터디 같이 하실 분 구합니다.',
    leader: { profileImg: '', nickname: '안승연' },
  },
  {
    id: 2,
    category: '프로그래밍',
    status: '모집 중',
    deadline: '2023.07.31',
    title: '알고리즘 스터디 같이 하실 분 구합니다.',
    leader: { profileImg: '', nickname: '안승연' },
  },
  {
    id: 3,
    category: '프로그래밍',
    status: '모집 중',
    deadline: '2023.07.31',
    title: '알고리즘 스터디 같이 하실 분 구합니다.',
    leader: { profileImg: '', nickname: '안승연' },
  },
  {
    id: 4,
    category: '프로그래밍',
    status: '모집 중',
    deadline: '2023.07.31',
    title: '알고리즘 스터디 같이 하실 분 구합니다.',
    leader: { profileImg: '', nickname: '안승연' },
  },
  {
    id: 5,
    category: '프로그래밍',
    status: '모집 중',
    deadline: '2023.07.31',
    title: '알고리즘 스터디 같이 하실 분 구합니다.',
    leader: { profileImg: '', nickname: '안승연' },
  },
];

const categories = ['ALL', '프로그래밍', '어학', '취업', '고시/공무원', '취미/교양', '기타'];

type StudySortingMethod = '최신순' | '인기순' | '마감임박순';

const studySortingOptions: DropDownOption[] = [
  { value: '최신순', content: '최신순' },
  { value: '인기순', content: '인기순' },
  { value: '마감임박순', content: '마감임박순' },
];

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['ALL']);
  const [studySortingMethod, setStudySortingMethod] = useState<StudySortingMethod>('최신순');
  const handleSelectCategory = (category: string) => {
    if (category === 'ALL') {
      setSelectedCategories(['ALL']);
    } else if (selectedCategories.includes(category) && category !== 'ALL') {
      if (selectedCategories.length === 1) {
        setSelectedCategories(['ALL']);
      } else {
        setSelectedCategories((prev) => prev.filter((c) => c !== category));
      }
    } else if (selectedCategories.length + 2 === categories.length) {
      setSelectedCategories(['ALL']);
    } else {
      setSelectedCategories((prev) => [...prev, category].filter((c) => c !== 'ALL'));
    }
  };
  return (
    <Layout hasFooter>
      <div className='pt-50 pb-200 px-140'>
        <div className='flex items-center gap-30 mb-14'>
          {/* 필터링 박스들 */}
          <section className='flex items-center gap-30'>
            {categories.map((categorie) => (
              <button
                key={categorie}
                onClick={() => handleSelectCategory(categorie)}
                className={cls(
                  'py-20 px-16 text-16 font-medium border-1 border-solid rounded-100',
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
            className='w-130'
            value={studySortingMethod}
            options={studySortingOptions}
            selectHandler={(value: StudySortingMethod) => setStudySortingMethod(value)}
          />
        </div>
        <main className='flex flex-wrap gap-24'>
          {DUMMY_STUDYS.map((study) => (
            <StudyCard key={study.id} studyInfo={study} />
          ))}
        </main>
        <CreateStudyBtn onClick={() => {}} className='fixed z-[9999] bottom-50 right-140' />
      </div>
    </Layout>
  );
}
