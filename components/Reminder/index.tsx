import React, { useMemo } from 'react';

import Color from 'color';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { useModal } from '../../hooks/modal';
import { useReminder } from '../../hooks/reminder';

type ReminderPreviewProps = {
  color: string;
  title: string;
  id: string;
  // eslint-disable-next-line no-unused-vars
  removeReminder: (arg: any) => void;
};

export const ReminderPreview: React.FC<ReminderPreviewProps> = ({ color, title, id, removeReminder }) => {
  const { showModal } = useModal();
  const { getReminder } = useReminder();
  const isBgDark = useMemo(() => Color(color || '#FFFFFF').isDark(), [color]);
  const reminder = getReminder(id);

  return (
    <div
      style={{ backgroundColor: color }}
      className="flex rounded h-fit w-full px-1 items-center justify-between group snap-start p-[1.75px]"
    >
      <span className={`${isBgDark ? 'text-white' : 'text-black'}`}>{title}</span>
      <div className="flex items-center">
        <FaEdit
          className={`${
            isBgDark ? 'fill-gray-50' : 'fill-gray-800'
          } fill-gray-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-all delay-75 scale-75 hover:scale-100`}
          onClick={() => {
            showModal(reminder?.date as Date, id);
          }}
        />
        <FaPlus
          className={`rotate-45 ${
            isBgDark ? 'fill-gray-50' : 'fill-gray-800'
          } opacity-0 group-hover:opacity-100 transition-all cursor-pointer delay-75 scale-75 hover:scale-100`}
          onClick={removeReminder}
        />
      </div>
    </div>
  );
};
