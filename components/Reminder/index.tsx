import React, { useMemo } from 'react';

import Color from 'color';
import { FaPlus } from 'react-icons/fa';

type ReminderPreviewProps = {
  color: string;
  title: string;
  id: string;
  // eslint-disable-next-line no-unused-vars
  removeReminder: (arg: any) => void;
};

export const ReminderPreview: React.FC<ReminderPreviewProps> = ({ color, title, id, removeReminder }) => {
  const isBgDark = useMemo(() => Color(color || '#FFFFFF').isDark(), [color]);

  return (
    <div
      key={id}
      style={{ backgroundColor: color }}
      className="flex rounded h-fit w-full px-1 items-center justify-between group snap-center p-[1.75px] cursor-pointer"
    >
      <span className={`${isBgDark ? 'text-white' : 'text-black'}`}>{title}</span>
      <FaPlus
        className={`rotate-45 ${
          isBgDark ? 'fill-gray-50' : 'fill-gray-800'
        } opacity-0 group-hover:opacity-100 transition-all delay-75 scale-75 hover:scale-100`}
        onClick={removeReminder}
      />
    </div>
  );
};
