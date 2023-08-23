import React, { useState } from 'react';
import { departments } from '@/enum/departments'; // department.ts 파일에서 departments 객체를 가져옵니다.
import { StudyCampus } from '@/types/studyInfo';

interface CategoryProps {
  errMsg?: string;
  onChange: (campus: StudyCampus, major: string) => void;
  defaultCampus?: StudyCampus;
  defaultDepartment?: string;
}

const Category: React.FC<CategoryProps> = ({ onChange, defaultCampus, defaultDepartment }) => {
  const [selectedCampus, setSelectedCampus] = useState<StudyCampus | null>(defaultCampus ? defaultCampus : '인문');
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const campus = event.target.value as StudyCampus;
    setSelectedCampus(campus);
    setSelectedMajor(null);

    onChange(campus, '');
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const major = event.target.value;
    setSelectedMajor(major);

    if (selectedCampus) {
      onChange(selectedCampus, major);
    }
  };

  return (
    <>
      <select
        onChange={handleCampusChange}
        className='border border-gray_70 py-12 px-15 mt-4 mr-10 max-w-100 w-full rounded-17 text-gray_70 text-14'
      >
        <option value={'인문'}>인문</option>
        <option value={'자연'}>자연</option>
      </select>

      <select
        onChange={handleMajorChange}
        className='border border-gray_70 py-12 px-15 mt-4 ml-6 max-w-244 w-full rounded-17 text-gray_70 text-14'
      >
        <option value=''>{defaultDepartment ? defaultDepartment : '학과를 선택해주세요'}</option>
        {departments[selectedCampus!].map((major) => (
          <option key={major} value={major}>
            {major}
          </option>
        ))}
      </select>
    </>
  );
};

export default Category;
