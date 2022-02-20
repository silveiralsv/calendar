import React, { useMemo } from 'react';
import { useReminder } from '../../hooks/reminder';

type EditModalProps = {
  reminderId: string;
  visible: boolean;
};

export const EditModal: React.FC<EditModalProps> = ({ reminderId, visible }) => {
  const { getReminder } = useReminder();

  const reminder = useMemo(() => {
    const foundReminder = getReminder(reminderId);
    return foundReminder;
  }, [reminderId]);
  console.log(`@@@@@ [LOG] ${new Date().toLocaleString()}  -> reminder`, reminder);

  return (
    <div
      className={`
        ${visible ? 'block' : 'hidden'} 
        absolute top-0 bottom-0 z-50 w-full h-full animate-blur  bg-gray-700 bg-opacity-60
      `}
    >
      <div className="" />
    </div>
  );
};
