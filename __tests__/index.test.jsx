import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { Modal } from '../components/Modal';
import { ReminderContext } from '../hooks/reminder';

jest.mock('../hooks/modal', () => ({
  useModal: () => ({
    date: new Date(),
    getForecast: () => ({
      main: 'Unknown',
      description: '',
      icon: '',
      temperature: 0,
    }),
    dismissModal: () => ({}),
    reminderId: '1',
  }),
}));

describe('Home', () => {
  it('renders a heading', () => {
    const getRemindersPreview = jest.fn().mockImplementation(() => [
      {
        id: '321',
        title: 'title',
        description: 'description',
        date: '2020-09-10T12:00',
        time: '10:00',
        city: 'New York',
        color: '#ff0000',
        forecast: {
          main: 'Unknown',
          description: '',
          icon: '',
          temperature: 0,
        },
      },
    ]);
    const getReminder = jest.fn().mockImplementation(() => ({
      id: '123',
      title: 'title',
      description: 'description',
      date: '2020-09-10T12:00',
      time: '10:00',
      city: 'New York',
      color: '#ff0000',
      forecast: {
        main: 'Unknown',
        description: '',
        icon: '',
        temperature: 0,
      },
    }));
    const removeReminder = jest.fn().mockImplementation(() => {});
    const removeAllReminders = jest.fn().mockImplementation(() => {});
    const upsertReminder = jest.fn().mockImplementation(() => ({}));

    render(
      <ReminderContext.Provider
        value={{
          getRemindersPreview,
          getReminder,
          upsertReminder,
          removeReminder,
          removeAllReminders,
        }}
      >
        <Modal />
      </ReminderContext.Provider>
    );
    const btn = screen.getByRole('button', { name: /Save/i });
    btn.click();
    expect(getReminder).toBeCalled();
  });
});
