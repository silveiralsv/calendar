import React from 'react';

type SubmitButtonProps = {
  text: string;
};

export const SubmitBtn: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all delay-100"
    >
      {text}
    </button>
  );
};
