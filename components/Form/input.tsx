/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { ReminderContent } from '../../hooks/reminder';

type InputProps = {
  label: string;
  placeholder?: string;
  maxLength?: number;
  type: React.HTMLInputTypeAttribute;
  value: string;
  name: keyof ReminderContent;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ label, placeholder, maxLength, type, name, onChange, value }) => {
  return (
    <div className="justify-between flex items-center gap-x-3">
      <span>{label}:</span>
      <input
        type={type}
        name={name}
        value={value}
        className={`${
          type === 'color' ? 'cursor-pointer border-none' : 'border-[1.5px] border-gray-800'
        } max-w-24 px-2  rounded`}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
