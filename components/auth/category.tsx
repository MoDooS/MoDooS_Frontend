import React, { useState } from 'react';
import { departments } from '@/enum/departments'; // department.ts 파일에서 departments 객체를 가져옵니다.

enum Campus {
  humanities = '인문',
  naturalScience = '자연',
}

interface CategoryProps {
  errMsg?: string;
  onChange: (campus: Campus, major: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onChange }) => {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(Campus.humanities);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const handleCampusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const campus = event.target.value as Campus;
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
    <div className='mt-14'>
      <div className='flex text-13 text-gray_70 justify-between max-w-360 w-full mt-15'>캠퍼스</div>
      <select
        onChange={handleCampusChange}
        className='border border-gray_70 py-12 px-15 mt-4 mr-10 max-w-100 w-full rounded-17 text-gray_70 text-14'
      >
        <option value={Campus.humanities}>인문</option>
        <option value={Campus.naturalScience}>자연</option>
      </select>

      <select
        onChange={handleMajorChange}
        className='border border-gray_70 py-12 px-15 mt-4 ml-6 max-w-244 w-full rounded-17 text-gray_70 text-14'
      >
        <option value=''>학과를 선택해주세요</option>
        {departments[selectedCampus!].map((major) => (
          <option key={major} value={major}>
            {major}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
