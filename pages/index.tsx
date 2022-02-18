import { v4 as uuid } from 'uuid';
import moment from 'moment';
import type { NextPage } from 'next';
import { useMemo } from 'react';

const Home: NextPage = () => {
  const weekDaysHeader = (
    <div className="grid grid-cols-7">
      {moment.weekdays().map((weekDay) => (
        <span
          className="flex justify-center items-center  bg-rose-400 border-[1px] border-gray-700 text-center text-xl"
          key={weekDay}
        >
          {weekDay}
        </span>
      ))}
    </div>
  );

  const daysInMonth = useMemo(() => {
    const momentObject = moment().startOf('month');
    const firstDay = parseInt(moment(momentObject).format('d'), 10);
    const lastDay = moment(momentObject).endOf('month').toDate().getDate();
    const lastMonth = moment(momentObject).subtract(1, 'months').endOf('month');

    const result = [];
    for (let i = 0; i < firstDay; i++) {
      result.push(
        <span
          className="bg-gray-400 border-[1px] border-gray-700 cursor-pointer hover:opacity-90 transition-opacity delay-75"
          key={uuid()}
        >
          {moment(lastMonth)
            .subtract(firstDay - 1 - i, 'days')
            .toDate()
            .getDate()}
        </span>
      );
    }

    for (let day = 0; day < lastDay; day++) {
      result.push(
        <span className="border-[1px] border-gray-700" key={uuid()}>
          {moment(momentObject).add(day, 'days').toDate().getDate()}
        </span>
      );
    }

    return result;
  }, []);

  return (
    <div className="h-screen bg-blue-400">
      {' '}
      {weekDaysHeader}
      <div className="grid grid-cols-7 bg-red-100 h-full max-h-full ">{daysInMonth}</div>
    </div>
  );
};

export default Home;
