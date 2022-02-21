import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { AddBtn } from '../Buttons/add';
import { useReminder } from '../../hooks/reminder';
import { ReminderPreview } from '../Reminder';
import { useModal } from '../../hooks/modal';

export const Calendar: React.FC = () => {
  const { getRemindersPreview, removeReminder, reminders } = useReminder();
  const { showModal } = useModal();

  const weekDaysHeader = moment.weekdays().map((weekDay) => (
    <th className="bg-rose-400 border-[1px] border-gray-700 text-center text-base md:text-xl" key={uuid()}>
      <div>{weekDay}</div>
    </th>
  ));

  const addTableColum = (content: React.ReactNode, disabled = false) => (
    <td key={uuid()} className={`${disabled ? 'bg-gray-200' : 'bg-white'} border-[1px] border-gray-800 relative group`}>
      <div className="absolute top-0 bottom-0 right-0 left-0">{content}</div>
    </td>
  );

  const daysInMonth = useMemo(() => {
    const momentObject = moment().startOf('month');
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
      result.push(
        addTableColum(
          <>
            <span className="relative flex justify-center">{dateAdd.getDate()}</span>
            <div className="flex flex-col gap-y-1.5 snap-y max-h-[70%] overflow-x-hidden  group-hover:overflow-y-auto scroll-smooth snap-mandatory px-1">
              {getRemindersPreview(dateAdd)?.map((reminder) => (
                <ReminderPreview
                  key={uuid()}
                  id={reminder?.id}
                  removeReminder={() => removeReminder(reminder?.id)}
                  title={reminder?.title}
                  color={reminder?.color}
                />
              ))}
            </div>
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
  }, [reminders]);

  return (
    <>
      {/* <Modal visible={visible} setVisible={setVisible} /> */}
      <table className="table-fixed w-full h-full">
        <thead>
          <tr>{weekDaysHeader}</tr>
        </thead>
        <tbody>{daysInMonth}</tbody>
      </table>
    </>
  );
};
