import React from 'react';

type InputProps = {
  label: string;
  placeholder?: string;
  maxLength?: number;
  type: 'text' | 'color';
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input: React.FC<InputProps> = ({ label, placeholder, maxLength, type, onChange, value }) => {
  return (
    <div className="justify-between flex items-center gap-x-3">
      <span>{label}:</span>
      <input
        value={value}
        type={type}
        onChange={onChange}
        className={`${
          type === 'color' ? 'cursor-pointer border-none' : 'border-[1.5px] border-gray-800'
        } max-w-24 px-2  rounded`}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};
