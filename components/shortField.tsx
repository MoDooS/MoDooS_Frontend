import { HTMLAttributes, useState } from 'react';
import Warning from '../public/icons/warning.svg';
import { Timer } from './timer';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  field: FieldType;
  btnText?: string;
}

export interface FieldType {
  label?: string;
  placeholder: string;
  errMsg?: string;
  onChange: (value: string) => void;
}

const ShortField: React.FC<Props> = ({ field, btnText, ...props }) => {
  const { label, placeholder, errMsg, onChange } = field;
  const _btnText = btnText;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='relative'>
      <div {...props} className='flex text-13 text-gray_70 justify-between mt-15'>
        {label}
      </div>

      <div className='flex'>
        <input
          type='text'
          onChange={handleChange}
          className='border border-gray_70 py-9 px-15 mt-4 mr-10 max-w-280 w-full rounded-17 placeholder-gray_70 placeholder: text-14'
          placeholder={placeholder}
        ></input>
        {_btnText ? (
          <div className='flex text-gray_90 text-16 bg-gray w-72 h-50 px-7 py-5 rounded-17 items-center justify-center'>
            {_btnText}
          </div>
        ) : (
          <Timer />
        )}
      </div>

      {errMsg && (
        <div className='ml-14 mt-4 flex text-13 text-red mb-20'>
          <Warning width='17px' />
          &nbsp;{errMsg}
        </div>
      )}
    </div>
  );
};

export default ShortField;
