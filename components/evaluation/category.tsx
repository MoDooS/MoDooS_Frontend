import React, { useState } from 'react';
import { feedback } from '@/enum/feedback';

enum FeedbackCategory {
  good = '이런 점이 좋았어요!',
  bad = '이런 점이 아쉬워요',
}

interface CategoryProps {
  errMsg?: string;
  onChange: (category: FeedbackCategory, feedback: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value as FeedbackCategory;
    setSelectedCategory(category);
    setSelectedFeedback(null);

    onChange(category, '');
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const feedback = event.target.value;
    setSelectedFeedback(feedback);

    if (selectedCategory) {
      onChange(selectedCategory, feedback);
    }
  };

  return (
    <div className='flex flex-col mt-14'>
      <select
        onChange={handleCategoryChange}
        className='border border-gray_70 py-12 px-15 mt-4 w-full max-w-430  rounded-17 text-gray_70 text-14'
      >
        <option value=''>카테고리를 선택해주세요.</option>
        {Object.values(FeedbackCategory).map((category) => (
          <option key={category} value={category} style={{ color: '#728197 !important' }}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <>
          <select
            onChange={handleFeedbackChange}
            className='border border-gray_70 py-12 px-15 mt-20 max-w-244 w-full rounded-17 text-gray_70 text-14'
          >
            <option value=''>피드백을 선택해주세요.</option>
            {feedback[selectedCategory].map((feedback) => (
              <option key={feedback} value={feedback}>
                {feedback}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Category;
