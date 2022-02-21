import React, { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { AddBtn } from '../Buttons/add';
import { useReminder } from '../../hooks/reminder';
import { ReminderPreview } from '../Reminder';
import { useModal } from '../../hooks/modal';
import { DeleteBtn } from '../Buttons/delete';

export const Calendar: React.FC = () => {
  const { getRemindersPreview, removeReminder, reminders, removeAllReminders } = useReminder();
  const { showModal } = useModal();

  const [selectedMonth, setSelectecMonth] = useState(moment().startOf('month'));

  const getAllYearMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(moment().month(i).startOf('month'));
    }
    return months;
  };

  const months = useMemo(() => getAllYearMonths(), []);
  const weekDaysHeader = moment.weekdays().map((weekDay) => (
    <th className="bg-slate-800 border-[1px] border-gray-700 text-slate-50 text-center text-base md:text-lg" key={uuid()}>
      <div>{weekDay}</div>
    </th>
  ));

  const addTableColum = (content: React.ReactNode, disabled = false) => (
    <td key={uuid()} className={`${disabled ? 'bg-gray-200' : 'bg-white'} border-[1px] border-gray-800 relative group`}>
      <div className="absolute top-0 bottom-0 right-0 left-0">{content}</div>
    </td>
  );

  const daysInMonth = useMemo(() => {
    const momentObject = moment(selectedMonth).startOf('month');
    const firstDay = parseInt(moment(momentObject).format('d'), 10);
    const lastDay = moment(momentObject).endOf('month').toDate().getDate();
    const lastMonth = moment(momentObject).subtract(1, 'months').endOf('month');
    const result = [];
    for (let i = 0; i < firstDay; i++) {
      result.push(
        addTableColum(
          <span className="relative flex justify-center">
            {moment(lastMonth)
              .subtract(firstDay - 1 - i, 'days')
              .toDate()
              .getDate()}
          </span>,
          true
        )
      );
    }

    for (let day = 0; day < lastDay; day++) {
      const dateAdd = moment(momentObject).add(day, 'days').toDate();

      const reminders = getRemindersPreview(dateAdd);

      result.push(
        addTableColum(
          <>
            <span className="relative flex justify-center">{dateAdd.getDate()}</span>
            <div className="flex flex-col gap-y-1.5 snap-y max-h-[70%] overflow-x-hidden  group-hover:overflow-y-auto scroll-smooth snap-mandatory px-1">
              {reminders?.map((reminder) => (
                <ReminderPreview
                  key={uuid()}
                  id={reminder?.id}
                  removeReminder={() => removeReminder(reminder?.id)}
                  title={reminder?.title}
                  color={reminder?.color}
                />
              ))}
            </div>

            {reminders?.length > 0 && (
              <DeleteBtn
                onClick={() => {
                  removeAllReminders(reminders.map(i => i.id));
                }}
              />
            )}
            <AddBtn
              handleAddReminder={() => {
                showModal(dateAdd);
              }}
            />
          </>
        )
      );
    }

    const parsedResult = [];
    for (let c = 0; c <= result.length; c += 7) {
      const weekChunk = result.slice(c, c + 7);
      let complementWeek = 1;
      while (weekChunk.length < 7) {
        weekChunk.push(
          addTableColum(
            <span className="relative flex justify-center">
              {moment(momentObject)
                .endOf('month')
                .add(complementWeek++, 'days')
                .toDate()
                .getDate()}
            </span>,
            true
          )
        );
      }
      parsedResult.push(<tr key={uuid()}>{weekChunk}</tr>);
    }
    return parsedResult;
  }, [reminders, selectedMonth]);

  return (
    <div className='flex flex-col w-screen h-screen'>
      <div className="flex w-full bg-slate-800 items-center justify-center">
        <select
          className=" font-bold text-slate-50 border-0 border-slate-900 bg-slate-800 focus:border-0"
          onChange={(e) => {
            setSelectecMonth(moment(new Date(e.target.value)).startOf('month'));
          }}
        >
          {months.map((month) => (
            <option
              className="font-semibold bg-slate-800 text-slate-50 border-0"
              key={uuid()}
              value={month.format('YYYY-MM-DDTHH:mm')}
              selected={month.format('YYYY-MM-DD') === selectedMonth.format('YYYY-MM-DD')}
            >
              {month.format('MMMM')}
            </option>
          ))}
        </select>
      </div>
      <table className="table-fixed w-full h-full">
        <thead>
          <tr>{weekDaysHeader}</tr>
        </thead>
        <tbody>{daysInMonth}</tbody>
      </table>
    </div>
  );
};
