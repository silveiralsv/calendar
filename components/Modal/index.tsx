import moment from 'moment';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState, useEffect } from 'react';
import { useReminder } from '../../hooks/reminder';
import { SeccondaryBtn } from '../Buttons/seccondary';
import { SubmitBtn } from '../Buttons/submit';
import { Input } from '../Form/input';

type CreateReminderProps = {
  visible: boolean;
  date: Date;
  setVisible: Dispatch<SetStateAction<boolean>>;
  reminderId?: string;
};

export type FormType = {
  id?: string;
  title?: string;
  description?: string;
  city?: string;
  color: string;
  date: string;
};

export const Modal: React.FC<CreateReminderProps> = ({ visible, date, setVisible, reminderId }) => {
  const { getReminder, upsertReminder } = useReminder();
  const [form, setForm] = useState<FormType>({
    title: undefined,
    description: undefined,
    city: undefined,
    color: '#e81a4b',
  } as FormType);

  useEffect(() => {
    setForm((old) => ({ ...old, date: moment(date).format('YYYY-MM-DDTHH:mm') }));
  }, [date]);

  useEffect(() => {
    if (reminderId) {
      const remind = getReminder(reminderId);
      setForm((old) => ({
        ...old,
        id: remind?.id,
        title: remind?.title,
        description: remind?.description,
        city: remind?.city,
        date: moment(remind?.date).format('YYYY-MM-DDTHH:mm'),
      }));
    }
  }, [reminderId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: keyof FormType) => {
    setForm((old) => ({
      ...old,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (form.title && form.description && form.city) {
      upsertReminder({
        ...form,
        date: new Date(`${form?.date}`),
      });
      setForm((old) => ({
        ...old,
        title: undefined,
        city: undefined,
        description: undefined,
      }));
    }
    setVisible(false);
  };

  return (
    <div
      className={`
        ${visible ? 'block' : 'hidden'}
        absolute top-0 bottom-0 z-50 w-full h-full animate-blur  bg-gray-700 bg-opacity-60
      `}
    >
      <div className=" absolute w-full h-full flex items-center justify-center drop-shadow-2xl motion-safe:animate-fade-in">
        <form className=" bg-gray-50 opacity-100 rounded flex flex-col max-w-fit p-8 gap-y-3" onSubmit={handleSubmit}>
          <Input
            value={form?.date || ''}
            onChange={(event) => handleChange(event, 'date')}
            type="datetime-local"
            label="Data"
            placeholder="Eg: Interview"
          />
          <Input
            value={form?.title || ''}
            onChange={(event) => handleChange(event, 'title')}
            type="text"
            label="Title"
            placeholder="Eg: Interview"
            maxLength={10}
          />
          <Input
            value={form?.description || ''}
            onChange={(event) => handleChange(event, 'description')}
            type="text"
            label="Description"
            placeholder="Eg: Interview with FANG"
          />
          <Input
            value={form?.city || ''}
            onChange={(event) => handleChange(event, 'city')}
            type="text"
            label="City"
            placeholder="Eg: Dublin"
          />
          <Input
            value={form?.color || ''}
            onChange={(event) => handleChange(event, 'color')}
            type="color"
            label="Color"
          />
          <div className="flex items-center justify-evenly">
            <SubmitBtn text="Create" />
            <SeccondaryBtn
              text="Cancel"
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
