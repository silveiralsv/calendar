import type { NextPage } from 'next';
import { useState } from 'react';
import { Calendar } from '../components/Calendar';
import { Modal } from '../components/Modal';

const Home: NextPage = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reminderId, setReminderId] = useState<string>();

  const handleAddReminder = (isVisible: boolean, date: Date) => {
    setSelectedDate(date);
    setVisible(isVisible);
  };

  return (
    <div className="relative overflow-hidden">
      <Modal visible={visible} date={selectedDate} setVisible={setVisible} />
      <div className="h-screen w-screen ">
        <Calendar handleAddReminder={handleAddReminder} />
      </div>
    </div>
  );
};

export default Home;
