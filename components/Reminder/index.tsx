import React, { useMemo, useState } from 'react';

import Color from 'color';
import { FaPlus, FaEdit } from 'react-icons/fa';

import { Modal } from '../Modal';

type ReminderPreviewProps = {
  color: string;
  title: string;
  id: string;
  date: Date;
  // eslint-disable-next-line no-unused-vars
  removeReminder: (arg: any) => void;
};

export const ReminderPreview: React.FC<ReminderPreviewProps> = ({ color, title, id, removeReminder, date }) => {
  const isBgDark = useMemo(() => Color(color || '#FFFFFF').isDark(), [color]);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        key={id}
        style={{ backgroundColor: color }}
        className="flex rounded h-fit w-full px-1 items-center justify-between group snap-start p-[1.75px] "
      >
        <span className={`${isBgDark ? 'text-white' : 'text-black'}`}>{title}</span>
        <div className="flex items-center">
          <FaEdit
            className={`${
              isBgDark ? 'fill-gray-50' : 'fill-gray-800'
            } fill-gray-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-all delay-75 scale-75 hover:scale-100`}
            onClick={() => setIsVisible(true)}
          />
          <FaPlus
            className={`rotate-45 ${
              isBgDark ? 'fill-gray-50' : 'fill-gray-800'
            } opacity-0 group-hover:opacity-100 transition-all cursor-pointer delay-75 scale-75 hover:scale-100`}
            onClick={removeReminder}
          />
        </div>
      </div>
      <Modal visible={isVisible} reminderId={id} key={id} setVisible={setIsVisible} date={date} />
    </>
  );
};
