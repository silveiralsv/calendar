import React from 'react';

import { FaPlus } from 'react-icons/fa';

type AddBtnProps = {
  // eslint-disable-next-line no-unused-vars
  handleAddReminder: (...props: any) => void;
};

export const AddBtn: React.FC<AddBtnProps> = ({ handleAddReminder }) => {
  return (
    <button
      className="
        absolute
        bottom-1
        right-1
        opacity-0
        group-hover:opacity-100
        transition-all
        delay-100
        hover:bg-rose-700
        rounded
      bg-rose-500
        w-6
        h-6
        flex
        items-center
        justify-center"
      type="button"
      onClick={() => {
        handleAddReminder();
      }}
    >
      <FaPlus className="fill-white w-3 h-3" />
    </button>
  );
};
