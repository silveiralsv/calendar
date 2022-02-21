import React from 'react';

type SeccondaryBtnProps = {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (arg: any) => void;
};

export const SeccondaryBtn: React.FC<SeccondaryBtnProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold outline outline-1 outline-slate-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all delay-100 "
    >
      {text}
    </button>
  );
};
