import React from 'react';

import { FaTrashAlt } from 'react-icons/fa';

type DeleteBtn = {
  // eslint-disable-next-line no-unused-vars
  onClick: (...props: any) => void;
};

export const DeleteBtn: React.FC<DeleteBtn> = ({ onClick }) => {
  return (
    <button
      className="
        absolute
        bottom-1
        left-1
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
        onClick();
      }}
    >
      <FaTrashAlt className="fill-white w-3 h-3" />
    </button>
  );
};
