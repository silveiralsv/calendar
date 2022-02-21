import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type SubmitButtonProps = {
  text: string;
  loading?: boolean;
};

export const SubmitBtn: React.FC<SubmitButtonProps> = ({ text, loading = false }) => {
  return (
    <button
      type="submit"
      className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all delay-100 min-w-[81px]  flex justify-center items-center"
    >
      {loading ? <AiOutlineLoading3Quarters className="animate-spin w-5 h-5 fill-white" /> : text}
    </button>
  );
};
