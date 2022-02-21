/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { ReminderContent } from '../../hooks/reminder';

type InputProps = {
  label: string;
  placeholder?: string;
  textBox?: boolean;
  type: React.HTMLInputTypeAttribute;
  value: string;
  name: keyof ReminderContent;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  value,
  error,
  textBox = false,
}) => {
  return (
    <div className="justify-between flex flex-col items-start gap-x-3">
      <span
        className={`
        ${error ? 'text-red-500' : 'text-gray-700'}
      `}
      >
        {label}:
      </span>
      {textBox ? (
        <textarea
          aria-label={name}
          name={name}
          value={value}
          className={`
          ${error ? 'border-red-600 border-2' : 'border-gray-800 border-[1.5px]'}
        w-full max-w-24 px-2  rounded resize-none`}
          placeholder={placeholder}
          onChange={(e) => onChange(e as any)}
        />
      ) : (
        <input
          id='input'
          aria-label={name}
          type={type}
          name={name}
          value={value}
          className={`${type === 'color' ? 'cursor-pointer border-none' : ''}
          ${error ? 'border-red-600 border-2' : 'border-gray-800 border-[1.5px]'}
          max-w-24 px-2  rounded`}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      )}
      <p className={`mt-[1px] ${error ? 'visible' : 'invisibe'} text-pink-600 text-sm`}>{error}</p>
    </div>
  );
};
