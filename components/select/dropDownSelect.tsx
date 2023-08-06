import React, { HTMLAttributes, useEffect, useState } from 'react';
import ChevronBottom from '../../public/icons/chevron_bottom.svg';
import { cls } from '@/utils/cls';
import StopPropagation from '../stopPropagation';

export interface DropDownOption {
  value: any;
  content: any;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: any;
  options: DropDownOption[];
  selectHandler: (value: any) => void;
}

export default function DropDownSelect({ value, options, selectHandler, ...props }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    const closeDropDown = () => setShowOptions(false);
    document.body.addEventListener('click', closeDropDown);
    return () => {
      document.body.removeEventListener('click', closeDropDown);
    };
  }, []);

  const handleOnClickMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // body의 eventListener 적용 안되게
    setShowOptions((prev) => !prev);
  };
  return (
    <div className={props.className ?? ''}>
      <button
        onClick={handleOnClickMenu}
        className='w-full py-6 px-13 flex items-center justify-between font-normal text-black shadow-neumorphism rounded-5'
      >
        <span>{value}</span>
        <ChevronBottom width='16' height='16' />
      </button>
      {showOptions && (
        <div className='relative w-full'>
          <ul
            className={cls(
              'absolute top-10 left-0 shadow-neumorphism w-full box-border bg-white rounded-5',
              props.className ?? '',
            )}
          >
            {options.map((option, i) => (
              <li
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('hi');
                  selectHandler(option.value);
                  setShowOptions(false);
                }}
                className={cls(
                  ' py-7 px-12 text-gray_70 font-normal border-t-1 cursor-pointer hover:bg-[#EFEFEF]',
                  i !== 0 ? ' border-t-gray_60' : ' border-t-white',
                )}
              >
                {option.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
