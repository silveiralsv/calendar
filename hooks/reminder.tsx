/* eslint-disable react/jsx-key */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ReminderPreview } from '../components/Reminder';

type ReminderContent = {
  id: string;
  date: Date;
  city: string;
  color: string;
  weather?: string;
  description: string;
  title: string;
};

type ReminderContextData = {
  // eslint-disable-next-line no-unused-vars
  addReminder(newReminder: Partial<Omit<ReminderContent, 'id'>>): void;
  // eslint-disable-next-line no-unused-vars
  getReminder(date: Date): ReminderContent[];
  // eslint-disable-next-line no-unused-vars
  getRemindersPreview(date: Date): React.ReactNode[];
  // eslint-disable-next-line no-unused-vars
  removeReminder(id: string): void;
  // eslint-disable-next-line no-unused-vars
  removeAllReminders(ids: string[]): void;
  getAllReminders(): ReminderContent[];
  reminders: ReminderContent[];
};

const ReminderContext = createContext<ReminderContextData>({} as ReminderContextData);

export const ReminderProvider: React.FC = ({ children }) => {
  const [reminders, setReminders] = useState<ReminderContent[]>([]);

  const addReminder = useCallback((reminder: Omit<ReminderContent, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: uuid(),
    };
    setReminders((old) => [...old, newReminder]);
  }, []);

  const removeReminder = useCallback(
    (id: string) => {
      const removedReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(removedReminders);
    },
    [reminders]
  );

  const getAllReminders = useCallback(() => {
    return reminders;
  }, []);

  const getRemindersPreview = useCallback(
    (date: Date) => {
      const reminderComponents = reminders
        .filter(
          (reminder) =>
            reminder.date.getDate() === date.getDate() &&
            reminder.date.getMonth() === date.getMonth() &&
            reminder.date.getFullYear() === date.getFullYear()
        )
        ?.sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((reminder) => (
          <ReminderPreview
            key={reminder.id}
            id={reminder.id}
            removeReminder={() => removeReminder(reminder.id)}
            title={reminder.title}
            color={reminder.color}
          />
        ));

      return reminderComponents;
    },
    [reminders]
  );

  const getReminder = useCallback(
    (date: Date) => {
      const found = reminders.filter(
        (reminder) =>
          reminder.date.getDate() === date.getDate() &&
          reminder.date.getMonth() === date.getMonth() &&
          reminder.date.getFullYear() === date.getFullYear()
      );
      return found;
    },
    [reminders]
  );

  const removeAllReminders = useCallback(
    (ids: string[]) => {
      const removedReminders = reminders.filter((reminder) => !ids.includes(reminder.id));
      setReminders(removedReminders);
    },
    [reminders]
  );

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        getRemindersPreview,
        addReminder,
        getReminder,
        removeReminder,
        removeAllReminders,
        getAllReminders,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};

export function useReminder(): ReminderContextData {
  const context = useContext(ReminderContext);

  if (!context) throw new Error('useReminder must be used within a ReminderProvider');

  return context;
}
